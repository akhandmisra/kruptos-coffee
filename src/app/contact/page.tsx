import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { contact } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Contact Kruptos Coffee Roasters for orders, wholesale beans, equipment rental and collaborations — call or WhatsApp +91 9179241042.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">Get In Touch</p>
      <h1 className="mt-2 font-display text-5xl text-bone sm:text-6xl">Contact</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4 font-sans text-base text-bone-dim">
          <p>For orders, wholesale, equipment rental or anything else — reach out and we&apos;ll get back to you.</p>
          <div className="rounded-sm border border-bone/10 bg-ink-raised p-6 font-mono text-sm">
            <p className="text-slate">Call / WhatsApp</p>
            <p className="mt-1">
              <a href={contact.phoneHref} className="text-bone hover:text-crema">{contact.phone}</a>
            </p>
            <p className="mt-4 text-slate">Email</p>
            <p className="mt-1">
              <a href={`mailto:${contact.email}`} className="text-bone hover:text-crema">{contact.email}</a>
            </p>
            <p className="mt-4 text-slate">Drink it fresh</p>
            <p className="mt-1">
              <a href={contact.cafesUrl} className="text-bone hover:text-crema">1DM cafes — Raipur, Bhilai, Bilaspur →</a>
            </p>
          </div>
          <p className="text-sm">
            Running a cafe, hotel or office?{" "}
            <Link href="/wholesale" className="text-crema underline">See wholesale</Link>.
          </p>
        </div>
        <LeadForm
          interests={["General enquiry", "Order help", "Wholesale coffee beans", "Equipment on rent", "Collaboration"]}
          source="kruptoscoffee.com/contact"
        />
      </div>
    </div>
  );
}
