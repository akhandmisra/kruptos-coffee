import "server-only";

/**
 * Sends the OTP code by email via Resend's HTTP API directly (no SDK
 * dependency — this is one POST request).
 *
 * DEV FALLBACK: if RESEND_API_KEY isn't set, no email is sent — instead the
 * caller gets the code back so it can be shown directly in the UI. This
 * fallback is hard-disabled outside development (see the NODE_ENV check
 * below) so a forgotten Resend key can never cause OTP codes to leak into
 * an API response on a real deployment; it would just fail loudly instead.
 */
export async function sendOtpEmail(
  email: string,
  code: string
): Promise<{ sent: boolean; devCode?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.MEMBERSHIP_EMAIL_FROM?.trim() || "Kruptos Coffee <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "RESEND_API_KEY is not set — can't send membership verification emails on a real deployment."
      );
    }
    console.warn(
      `[membership] RESEND_API_KEY not set — dev fallback: code for ${email} is ${code}`
    );
    return { sent: false, devCode: code };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: `Your Kruptos rental verification code: ${code}`,
      html: `<p>Your 1DM member verification code is:</p><p style="font-size:28px;font-weight:bold;letter-spacing:4px">${code}</p><p>This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>`,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend API error (${res.status}): ${text}`);
  }

  return { sent: true };
}
