export const metadata = { title: "The Genesis — Kruptos Coffee Roasters" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-crema">
        Liner Notes
      </p>
      <h1 className="mt-2 font-display text-5xl text-bone sm:text-6xl">
        The Genesis
      </h1>

      <div className="mt-8 space-y-6 font-sans text-base leading-relaxed text-bone-dim">
        <p>
          Kruptos started as five years of R&amp;D and a lot of bad coffee
          before the good coffee. Founder Akhand Mishra trained directly with
          the Coffee Board of India, chasing a simple idea: Chhattisgarh
          didn&apos;t have a specialty roastery yet, so build the first one.
        </p>
        <p>
          Every roast is treated like a record: dialled in against a
          playlist, named for it, and shipped with a QR code so you can put
          the same music on while you brew. Side A is usually the roast we
          start with. Side B is where it gets interesting.
        </p>
        <p>
          Beans come direct from small farms in Chikkamagaluru, Karnataka and
          Koraput, Odisha — chosen for process as much as origin, from
          straightforward washed lots to anaerobic and yeast-fermented
          experiments.
        </p>
      </div>
    </div>
  );
}
