import Link from "next/link";
import { notFound } from "next/navigation";
import { journalArticles, getJournalArticle, type JournalBlock } from "@/lib/journal";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const a = getJournalArticle(slug);
  if (!a) return { title: "Not found" };
  return {
    title: a.title,
    description: a.dek,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.dek, url: `/journal/${a.slug}`, publishedTime: a.publishedAt },
  };
}

function Block({ b }: { b: JournalBlock }) {
  switch (b.type) {
    case "h2":
      return <h2 className="mt-10 font-display text-3xl text-bone">{b.text}</h2>;
    case "p":
      return <p className="mt-4 font-sans text-base leading-relaxed text-bone-dim">{b.text}</p>;
    case "list":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-base leading-relaxed text-bone-dim">
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "links":
      return (
        <div className="mt-10 flex flex-wrap gap-3 border-t border-bone/10 pt-8">
          {b.items.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-bone/25 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-bone hover:border-crema hover:text-crema"
            >
              {l.label} →
            </Link>
          ))}
        </div>
      );
  }
}

export default async function JournalArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const a = getJournalArticle(slug);
  if (!a) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.dek,
    datePublished: a.publishedAt,
    url: `${siteUrl}/journal/${a.slug}`,
    mainEntityOfPage: `${siteUrl}/journal/${a.slug}`,
    image: `${siteUrl}/images/estate-banner.jpg`,
    author: { "@type": "Organization", name: "Kruptos Coffee Roasters", url: siteUrl },
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Link href="/journal" className="font-mono text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-crema">
        ← Journal
      </Link>
      <h1 className="mt-6 font-display text-5xl leading-[0.95] text-bone sm:text-6xl">{a.title}</h1>
      <p className="mt-5 font-sans text-lg text-bone-dim">{a.dek}</p>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate">{a.readTime}</p>
      <div className="mt-6">
        {a.body.map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </div>
    </article>
  );
}
