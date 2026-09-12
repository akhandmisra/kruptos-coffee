import Image from "next/image";
import { contrastText } from "@/lib/color";

/**
 * The brand's signature visual: every product is presented like a record
 * sleeve, since Kruptos pairs every roast with a QR code to a Spotify
 * playlist. A slice of "vinyl" peeks out from behind the sleeve on hover.
 *
 * When a real product photo has been uploaded in Shopify, it's used as the
 * sleeve artwork. Until then (or for products that never get one), we fall
 * back to a flat accent color drawn entirely in CSS.
 */
export function ProductSleeve({
  title,
  accent,
  category,
  image,
}: {
  title: string;
  accent: string;
  category: "coffee" | "merch" | "equipment";
  image?: { url: string; alt: string } | null;
}) {
  const ink = image ? "#F5F1E8" : contrastText(accent);

  return (
    <div
      className="group relative aspect-square w-full overflow-hidden rounded-sm"
      style={{ background: accent }}
    >
      {image && (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="(min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      )}

      {/* vinyl disc, offset to the right, slides out further on hover.
          The record-sleeve motif ties to coffee's roast+playlist pairing —
          it doesn't apply to equipment, and now that real gear photos exist
          it just clashes with them, so equipment skips it entirely. */}
      {category !== "equipment" && (
        <div
          className="absolute top-1/2 right-0 h-[85%] w-[85%] -translate-y-1/2 translate-x-[38%] rounded-full bg-[radial-gradient(circle_at_center,_#0000_0,_#0000_18%,_#000_18.5%,_#111_19%,_#000_38%,_#111_38.5%,_#000_60%)] opacity-90 transition-transform duration-500 ease-out group-hover:translate-x-[50%]"
          aria-hidden
        >
          <div className="absolute inset-0 m-auto h-[22%] w-[22%] rounded-full border-4 border-ink bg-bone" />
        </div>
      )}

      {image && (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      )}

      {/* sleeve typography */}
      <div className="relative flex h-full flex-col justify-between p-5">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70"
          style={{ color: ink }}
        >
          {category === "coffee" ? "Side A" : category === "equipment" ? "Gear" : "Merch"}
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
