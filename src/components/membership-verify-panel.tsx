"use client";

import { useState } from "react";

type Step = "prompt" | "email" | "code";

/**
 * The "1DM member? Verify your email to unlock rental" widget. Lives inline
 * on the product page next to the Buy/Rent picker — see add-to-cart.tsx.
 *
 * This is intentionally the ONLY way to see a Rent option: a non-member
 * never sees Rent at all, they see this prompt instead. Buy is always
 * available regardless.
 */
export function MembershipVerifyPanel({
  onVerified,
  promptLabel = "1DM member? Verify your email to unlock rental",
}: {
  onVerified: (name: string) => void;
  /** Lets pages that aren't about rental (coffee, merch, equipment Buy-only)
   * use copy about the 10% discount instead. */
  promptLabel?: string;
}) {
  const [step, setStep] = useState<Step>("prompt");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/membership/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setDevCode(data.devCode ?? null);
      setStep("code");
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/membership/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      onVerified(data.name);
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "prompt") {
    return (
      <button
        onClick={() => setStep("email")}
        className="rounded-full border border-bone/25 px-4 py-1.5 font-sans text-sm text-bone-dim underline decoration-dotted underline-offset-4 transition-colors hover:border-bone/60 hover:text-bone"
      >
        {promptLabel}
      </button>
    );
  }

  if (step === "email") {
    return (
      <form onSubmit={requestCode} className="space-y-2 rounded-2xl border border-bone/15 p-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-crema">
          Verify 1DM membership
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="min-w-0 flex-1 rounded-full border border-bone/25 bg-transparent px-4 py-2 font-sans text-sm text-bone placeholder:text-bone-dim/60 focus:border-crema focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-crema px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-ink disabled:opacity-40"
          >
            {loading ? "Sending…" : "Send code"}
          </button>
        </div>
        {error && <p className="font-sans text-xs text-red-400">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={verifyCode} className="space-y-2 rounded-2xl border border-bone/15 p-4">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-crema">
        Enter your code
      </p>
      <p className="font-sans text-xs text-bone-dim">Sent to {email}.</p>
      {devCode && (
        <p className="rounded-lg bg-amber-500/10 px-3 py-2 font-mono text-xs text-amber-300">
          DEV MODE (no email service configured yet) — your code is{" "}
          <span className="font-bold">{devCode}</span>
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          inputMode="numeric"
          required
          autoFocus
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="6-digit code"
          className="min-w-0 flex-1 rounded-full border border-bone/25 bg-transparent px-4 py-2 font-mono text-sm tracking-[0.3em] text-bone placeholder:tracking-normal placeholder:text-bone-dim/60 focus:border-crema focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-crema px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-ink disabled:opacity-40"
        >
          {loading ? "Checking…" : "Verify"}
        </button>
      </div>
      {error && <p className="font-sans text-xs text-red-400">{error}</p>}
      <button
        type="button"
        onClick={() => setStep("email")}
        className="font-sans text-xs text-bone-dim underline decoration-dotted underline-offset-4"
      >
        Use a different email
      </button>
    </form>
  );
}
