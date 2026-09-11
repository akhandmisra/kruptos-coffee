import "server-only";
import { getMembers } from "./store";
import { MembershipCheckResult } from "./types";

/**
 * Is this email a currently-active or lifetime 1DM member?
 *
 * Status (lifetime / active / expired) is computed once, when the record is
 * loaded — see the Google Sheet / local JSON shape in store.ts. This is just
 * the lookup + today's-date-vs-validUntil check.
 */
export async function checkMembership(
  emailRaw: string
): Promise<MembershipCheckResult> {
  const email = emailRaw.trim().toLowerCase();
  const members = await getMembers();
  const record = members.find((m) => m.email === email);

  if (!record) return { ok: false, reason: "not_found" };

  if (record.status === "lifetime") return { ok: true, name: record.name };

  if (record.status === "active" && record.validUntil) {
    const validUntil = new Date(record.validUntil + "T23:59:59");
    if (validUntil.getTime() >= Date.now()) {
      return { ok: true, name: record.name };
    }
    return { ok: false, reason: "expired" };
  }

  return { ok: false, reason: "expired" };
}
