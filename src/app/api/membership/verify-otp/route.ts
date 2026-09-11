import { NextRequest, NextResponse } from "next/server";
import {
  MEMBER_COOKIE,
  OTP_COOKIE,
  packMemberSession,
  readPendingOtp,
} from "@/lib/membership/otp";
import { checkMembership } from "@/lib/membership/verify";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const code = String(body.code ?? "").trim();

    const pending = readPendingOtp(request.cookies.get(OTP_COOKIE)?.value);
    if (!pending) {
      return NextResponse.json(
        { ok: false, error: "That code has expired. Request a new one." },
        { status: 400 }
      );
    }

    if (code !== pending.code) {
      return NextResponse.json(
        { ok: false, error: "That code doesn't match. Check it and try again." },
        { status: 400 }
      );
    }

    // Re-check membership at confirm time too, not just at request time —
    // cheap, and avoids trusting a 10-minute-old membership check.
    const membership = await checkMembership(pending.email);
    if (!membership.ok) {
      return NextResponse.json(
        { ok: false, error: "That membership is no longer active." },
        { status: 403 }
      );
    }

    const { token, maxAgeSeconds } = packMemberSession(pending.email, membership.name);
    const response = NextResponse.json({ ok: true, name: membership.name });
    response.cookies.set(MEMBER_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAgeSeconds,
    });
    response.cookies.delete(OTP_COOKIE);
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
