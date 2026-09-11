import "server-only";
import crypto from "crypto";

/**
 * Stateless OTP handling — no database. The pending code and the confirmed
 * "verified member" status are both just signed, expiring cookies. See
 * app/api/membership/*.
 */

export const OTP_COOKIE = "kruptos_otp_pending";
export const MEMBER_COOKIE = "kruptos_member";

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const OTP_RESEND_COOLDOWN_MS = 60 * 1000; // 1 minute
const MEMBER_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSecret(): string {
  const secret = process.env.MEMBERSHIP_OTP_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "MEMBERSHIP_OTP_SECRET must be set in production — generate one with `openssl rand -base64 32` and add it in Vercel."
    );
  }
  console.warn(
    "[membership] MEMBERSHIP_OTP_SECRET is not set — using an insecure dev-only default. Fine for `next dev`, never for a real deployment."
  );
  return "dev-only-insecure-secret-do-not-use-in-production";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function pack(data: Record<string, string | number>): string {
  const json = JSON.stringify(data);
  const b64 = Buffer.from(json, "utf8").toString("base64url");
  const sig = sign(b64);
  return `${b64}.${sig}`;
}

function unpack<T>(token: string | undefined): T | null {
  if (!token) return null;
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return null;
  const expected = sign(b64);
  // constant-time compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(b64, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

export function generateCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

type PendingOtp = { email: string; code: string; exp: number; sentAt: number };

export function packPendingOtp(email: string, code: string): {
  token: string;
  maxAgeSeconds: number;
} {
  const now = Date.now();
  const payload: PendingOtp = { email, code, exp: now + OTP_TTL_MS, sentAt: now };
  return {
    token: pack(payload),
    maxAgeSeconds: Math.floor(OTP_TTL_MS / 1000),
  };
}

export function readPendingOtp(token: string | undefined): PendingOtp | null {
  const data = unpack<PendingOtp>(token);
  if (!data) return null;
  if (Date.now() > data.exp) return null;
  return data;
}

/** How many seconds until this email is allowed a fresh code. 0 = allowed now. */
export function resendCooldownRemaining(pending: PendingOtp | null): number {
  if (!pending) return 0;
  const elapsed = Date.now() - pending.sentAt;
  if (elapsed >= OTP_RESEND_COOLDOWN_MS) return 0;
  return Math.ceil((OTP_RESEND_COOLDOWN_MS - elapsed) / 1000);
}

type MemberSession = { email: string; name: string; exp: number };

export function packMemberSession(email: string, name: string): {
  token: string;
  maxAgeSeconds: number;
} {
  const exp = Date.now() + MEMBER_TTL_MS;
  return {
    token: pack({ email, name, exp } satisfies MemberSession),
    maxAgeSeconds: Math.floor(MEMBER_TTL_MS / 1000),
  };
}

export function readMemberSession(token: string | undefined): MemberSession | null {
  const data = unpack<MemberSession>(token);
  if (!data) return null;
  if (Date.now() > data.exp) return null;
  return data;
}
