"use client";

import { useState } from "react";
import { contact } from "@/lib/site";

const input =
  "w-full rounded-sm border border-bone/15 bg-ink px-4 py-3 font-sans text-sm text-bone outline-none placeholder:text-slate focus:border-crema";
const label = "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim";

type State = "idle" | "sending" | "sent" | "error";

export function LeadForm({ interests, source }: { interests: string[]; source: string }) {
  const [state, setState] = useState<State>("idle");
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    city: "",
    interest: interests[0],
    volume: "",
    message: "",
  });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, source }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const wa = contact.whatsappHref(`Hi Kruptos, I'm interested in ${f.interest.toLowerCase()}. Business: ${f.business} City: ${f.city}`);

  if (state === "sent") {
    return (
      <div className="rounded-sm border border-crema/40 bg-ink-raised p-8">
        <p className="font-display text-3xl text-bone">Got it — thank you.</p>
        <p className="mt-3 font-sans text-sm text-bone-dim">
          Our team will call you back within one working day. Need it sooner?{" "}
          <a href={wa} target="_blank" rel="noreferrer" className="text-crema underline">
            WhatsApp us
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-sm border border-bone/10 bg-ink-raised p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="l-name" className={label}>Name</label>
          <input id="l-name" required value={f.name} onChange={set("name")} className={input} />
        </div>
        <div>
          <label htmlFor="l-phone" className={label}>Phone / WhatsApp</label>
          <input id="l-phone" type="tel" required value={f.phone} onChange={set("phone")} className={input} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="l-email" className={label}>Email (optional)</label>
          <input id="l-email" type="email" value={f.email} onChange={set("email")} className={input} />
        </div>
        <div>
          <label htmlFor="l-city" className={label}>City</label>
          <input id="l-city" value={f.city} onChange={set("city")} className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="l-business" className={label}>Business name (cafe, hotel, office…)</label>
        <input id="l-business" value={f.business} onChange={set("business")} className={input} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="l-interest" className={label}>Interested in</label>
          <select id="l-interest" value={f.interest} onChange={set("interest")} className={input}>
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="l-volume" className={label}>Approx. coffee per month (optional)</label>
          <input id="l-volume" placeholder="e.g. 10 kg" value={f.volume} onChange={set("volume")} className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="l-message" className={label}>Anything else (optional)</label>
        <textarea id="l-message" rows={4} value={f.message} onChange={set("message")} className={input} />
      </div>

      {state === "error" && (
        <p className="rounded-sm border border-crema/40 p-4 font-sans text-sm text-bone">
          Couldn&apos;t send the form right now — please{" "}
          <a href={wa} target="_blank" rel="noreferrer" className="text-crema underline">
            WhatsApp us
          </a>{" "}
          or call {contact.phone}.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-full bg-crema px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-ink hover:opacity-90 disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : "Request a callback"}
        </button>
        <a href={wa} target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-crema">
          Or WhatsApp {contact.phone} →
        </a>
      </div>
    </form>
  );
}
