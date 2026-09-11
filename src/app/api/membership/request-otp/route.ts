import { NextRequest, NextResponse } from "next/server";
import { checkMembership } from "@/lib/membership/verify";
import { sendOtpEmail } from "@/lib/membership/email";
import {
  OTP_COOKIE,
  generateCode,
  packPendingOtp,
  readPendingOtp,
  resendCooldownRemaining,
} from "@/lib/membership/otp";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    // Resend cooldown: don't let someone spam a stranger's inbox.
    const existingPending = readPendingOtp(request.cookies.get(OTP_COOKIE)?.value);
    const cooldown =
      existingPending?.email === email
        ? resendCooldownRemaining(existingPending)
        : 0;
    if (cooldown > 0) {
      return NextResponse.json(
        { ok: false, error: `Please wait ${cooldown}s before requesting another code.` },
        { status: 429 }
      );
    }

    const membership = await checkMembership(email);
    if (!membership.ok) {
      // Deliberately generic — doesn't distinguish "never a member" from
      // "expired" to a stranger poking at the endpoint.
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't find an active 1DM membership for that email. Double-check it, or reach out to 1DM if you think this is wrong.",
        },
        { status: 404 }
      );
    }

    const code = generateCode();
    const { token, maxAgeSeconds } = packPendingOtp(email, code);
    const { sent, devCode } = await sendOtpEmail(email, code);

    const response = NextResponse.json({
      ok: true,
      sentTo: email,
      // Only ever present when RESEND_API_KEY is unset AND we're not in
      // production — see src/lib/membership/email.ts.
      devCode,
      emailSent: sent,
    });
    response.cookies.set(OTP_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAgeSeconds,
    });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
