import "server-only";
import { cookies } from "next/headers";
import { MEMBER_COOKIE, readMemberSession } from "./otp";

/** Read in Server Components only — pass the result down as a prop to any
 * Client Component that needs it (Client Components can't read cookies
 * directly). See src/app/products/[handle]/page.tsx for the pattern. */
export async function getVerifiedMember(): Promise<{ email: string; name: string } | null> {
  const store = await cookies();
  const session = readMemberSession(store.get(MEMBER_COOKIE)?.value);
  return session ? { email: session.email, name: session.name } : null;
}

/** Master kill-switch — while false, Rent is hidden for everyone, member or
 * not, and the whole verification prompt never renders. Flip to "true" in
 * Vercel once the membership data + Resend are actually ready to go live. */
export function isRentalEnabled(): boolean {
  return process.env.RENTAL_ENABLED === "true";
}
