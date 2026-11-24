import { NextResponse } from "next/server";

// Wholesale / B2B enquiries from /wholesale and /contact. Emailed to the 1DM
// team through Resend (the same account the membership OTP emails use).
// LEAD_TO_EMAIL can override where leads land.

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  business?: string;
  city?: string;
  interest?: string;
  volume?: string;
  message?: string;
  source?: string;
};

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Lead;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lead = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    business: clean(body.business, 160),
    city: clean(body.city, 80),
    interest: clean(body.interest, 120),
    volume: clean(body.volume, 120),
    message: clean(body.message),
    source: clean(body.source, 80) || "website",
  };

  if (!lead.name || (!lead.phone && !lead.email)) {
    return NextResponse.json({ error: "Please add your name and a phone number or email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("Lead form: RESEND_API_KEY is not set.");
    return NextResponse.json({ error: "Email isn't configured." }, { status: 500 });
  }

  const from = process.env.MEMBERSHIP_EMAIL_FROM?.trim() || "Kruptos Coffee <onboarding@resend.dev>";
  const to = (process.env.LEAD_TO_EMAIL?.trim() || "1dollarmoffee@gmail.com").split(",").map((s) => s.trim());

  const rows: [string, string][] = [
    ["Interested in", lead.interest || "—"],
    ["Name", lead.name],
    ["Business", lead.business || "—"],
    ["City", lead.city || "—"],
    ["Phone / WhatsApp", lead.phone || "—"],
    ["Email", lead.email || "—"],
    ["Monthly volume", lead.volume || "—"],
    ["Source page", lead.source],
  ];

  const html = `<h2>New Kruptos lead: ${esc(lead.interest || "Wholesale")}</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#666">${esc(k)}</td><td><b>${esc(v)}</b></td></tr>`)
    .join("")}</table>
<p style="white-space:pre-wrap">${esc(lead.message || "(no message)")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.email || undefined,
      subject: `New Kruptos lead: ${lead.interest || "Wholesale"} — ${lead.name}${lead.city ? `, ${lead.city}` : ""}`,
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${lead.message || "(no message)"}`,
    }),
  });

  if (!res.ok) {
    console.error(`Lead form: Resend error ${res.status}: ${await res.text()}`);
    return NextResponse.json({ error: "Couldn't send right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
