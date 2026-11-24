import Link from "next/link";
import { journalArticles } from "@/lib/journal";

export const metadata = {
  title: "Journal — Coffee Guides & Stories",
  description:
    "Brew guides, equipment advice and origin stories from Kruptos Coffee Roasters — Bastar coffee, choosing a grinder, and more.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">Liner Notes</p>
      <h1 className="mt-2 font-display text-5xl text-bone sm:text-6xl">Journal</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {journalArticles.map((a) => (
          <Link
            key={a.slug}
            href={`/journal/${a.slug}`}
            className="group rounded-sm border border-bone/10 bg-ink-raised p-6 hover:border-crema/50"
          >
            <h2 className="font-display text-3xl text-bone group-hover:text-crema">{a.title}</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-bone-dim">{a.dek}</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate">{a.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
