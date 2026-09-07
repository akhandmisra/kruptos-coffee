export const metadata = { title: "Contact — Kruptos Coffee Roasters" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
        Get In Touch
      </p>
      <h1 className="mt-2 font-display text-5xl text-bone sm:text-6xl">
        Contact
      </h1>

      <div className="mt-8 space-y-4 font-sans text-base text-bone-dim">
        <p>
          For orders, wholesale, or general questions — reach out and we&apos;ll
          get back to you.
        </p>
        <div className="rounded-sm border border-bone/10 bg-ink-raised p-6 font-mono text-sm">
          <p className="text-slate">Email</p>
          <p className="mt-1 text-bone">hello@kruptoscoffee.com</p>
          <p className="mt-4 text-slate">Instagram</p>
          <p className="mt-1 text-bone">@kruptoscoffee</p>
        </div>
        <p className="text-xs text-slate">
          (Placeholder contact details — swap these for the real ones when
          you send them over.)
        </p>
      </div>
    </div>
  );
}
