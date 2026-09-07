import { contrastText } from "@/lib/color";

/**
 * The brand's signature visual: every product is presented like a record
 * sleeve, since Kruptos pairs every roast with a QR code to a Spotify
 * playlist. A slice of "vinyl" peeks out from behind the sleeve on hover.
 * This is drawn entirely in CSS so it works before real product photography
 * exists.
 */
export function ProductSleeve({
  title,
  accent,
  category,
}: {
  title: string;
  accent: string;
  category: "coffee" | "merch";
}) {
  const ink = contrastText(accent);

  return (
    <div
      className="group relative aspect-square w-full overflow-hidden rounded-sm"
      style={{ background: accent }}
    >
      {/* vinyl disc, offset to the right, slides out further on hover */}
      <div
        className="absolute top-1/2 right-0 h-[85%] w-[85%] -translate-y-1/2 translate-x-[38%] rounded-full bg-[radial-gradient(circle_at_center,_#0000_0,_#0000_18%,_#000_18.5%,_#111_19%,_#000_38%,_#111_38.5%,_#000_60%)] opacity-90 transition-transform duration-500 ease-out group-hover:translate-x-[50%]"
        aria-hidden
      >
        <div className="absolute inset-0 m-auto h-[22%] w-[22%] rounded-full border-4 border-ink bg-bone" />
      </div>

      {/* sleeve typography */}
      <div className="relative flex h-full flex-col justify-between p-5">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70"
          style={{ color: ink }}
        >
          {category === "coffee" ? "Side A" : "Merch"}
        </span>
        <span
          className="font-display text-3xl leading-[0.9] sm:text-4xl"
          style={{ color: ink }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
