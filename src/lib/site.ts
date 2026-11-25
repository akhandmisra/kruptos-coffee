// Single source of truth for the site's URL, contact details and shared SEO
// pieces (structured data), so every page and the sitemap agree.

export const siteUrl = "https://kruptoscoffee.com";
export const siteName = "Kruptos Coffee Roasters";
// Brewing Gadgets — Kruptos is their authorised dealer in Chhattisgarh.
export const BREWING_GADGETS_URL = "https://www.brewinggadgets.com";

export const defaultOgImage = "/images/estate-banner.jpg";

export const contact = {
  phone: "+91 9179241042",
  phoneHref: "tel:+919179241042",
  whatsappHref: (text: string) => `https://wa.me/919179241042?text=${encodeURIComponent(text)}`,
  email: "hello@1dollarmoffee.com",
  cafesUrl: "https://www.1dm.coffee/locations",
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: "Kruptos Coffee",
    url: siteUrl,
    logo: `${siteUrl}/apple-icon.png`,
    description:
      "Specialty coffee roastery from Chhattisgarh, India. Small-batch roasts with full traceability, coffee grown in Bastar, coffee machines, grinders and brewing equipment supplied to buy or rent (Hario, Timemore, Fellow, Comandante, Mahlkönig, Baratza and more; authorised Brewing Gadgets dealer in Chhattisgarh), and wholesale beans for cafes, hotels and offices.",
    areaServed: "IN",
    address: { "@type": "PostalAddress", addressRegion: "Chhattisgarh", addressCountry: "IN" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      email: contact.email,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    parentOrganization: { "@type": "Organization", name: "1DM", url: "https://www.1dm.coffee" },
    sameAs: ["https://www.1dm.coffee/kruptos"],
  };
}
