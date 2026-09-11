import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { MemberRecord } from "./types";

/**
 * Where the 1DM membership list comes from.
 *
 * This is a placeholder for the real, live source of truth. The plan is for
 * this to eventually read from 1DM's own Google Sheet (via the Sheets API +
 * a service account) so the list never goes stale. Until that's wired up,
 * this checks three places, in order:
 *
 *   1. MEMBERSHIP_DATA_JSON — a full JSON array of MemberRecord, as a Vercel
 *      environment variable. This is the recommended way to get real member
 *      data onto the live site *without* ever committing it to git — paste
 *      the array as an env var value in the Vercel dashboard.
 *   2. membership-data/members.json — a developer's own local file for
 *      testing with real or realistic data. Gitignored on purpose, never
 *      committed. (The path is intentionally a hardcoded literal, not built
 *      from an env var — a dynamic fs path here makes Next.js trace and
 *      bundle the whole project into the deployed function.)
 *   3. membership-data/members.example.json — a small committed file with
 *      obviously-fake sample members, so the app always has *something* to
 *      demo with even with no configuration at all.
 *
 * Swap this whole file for a Google Sheets-backed version later; nothing
 * else in the membership feature needs to change — everything else calls
 * getMembers() and doesn't know or care where the list came from.
 */

let cached: MemberRecord[] | null = null;
let cachedAt = 0;
const CACHE_MS = 30_000; // avoid re-reading the file/env on every request

export async function getMembers(): Promise<MemberRecord[]> {
  const now = Date.now();
  if (cached && now - cachedAt < CACHE_MS) return cached;

  const fromEnv = process.env.MEMBERSHIP_DATA_JSON?.trim();
  if (fromEnv) {
    try {
      const parsed = JSON.parse(fromEnv) as MemberRecord[];
      cached = normalize(parsed);
      cachedAt = now;
      return cached;
    } catch (err) {
      console.error(
        "MEMBERSHIP_DATA_JSON is set but isn't valid JSON — falling back.",
        err
      );
    }
  }

  const localPath = path.join(process.cwd(), "membership-data", "members.json");

  try {
    const raw = await fs.readFile(localPath, "utf8");
    cached = normalize(JSON.parse(raw));
    cachedAt = now;
    return cached;
  } catch {
    // no local file — fall through to the example data
  }

  try {
    const examplePath = path.join(
      process.cwd(),
      "membership-data",
      "members.example.json"
    );
    const raw = await fs.readFile(examplePath, "utf8");
    cached = normalize(JSON.parse(raw));
    cachedAt = now;
    return cached;
  } catch (err) {
    console.error("No membership data source could be read at all.", err);
    cached = [];
    cachedAt = now;
    return cached;
  }
}

function normalize(records: MemberRecord[]): MemberRecord[] {
  return records.map((r) => ({ ...r, email: r.email.trim().toLowerCase() }));
}
