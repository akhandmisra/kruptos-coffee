export type MemberStatus = "lifetime" | "active" | "expired" | "unknown";

export type MemberRecord = {
  name: string;
  /** Always stored lowercase. */
  email: string;
  status: MemberStatus;
  /** ISO date string. Absent for lifetime members. */
  validUntil?: string;
};

export type MembershipCheckResult =
  | { ok: true; name: string }
  | { ok: false; reason: "not_found" | "expired" };
