import { NextResponse } from "next/server";
import { MEMBER_COOKIE } from "@/lib/membership/otp";

// Lets a verified visitor drop back to non-member view — mainly useful for
// testing the gate repeatedly without clearing cookies by hand.
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(MEMBER_COOKIE);
  return response;
}
