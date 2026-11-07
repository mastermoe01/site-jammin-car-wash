import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { ActionBar } from "@/components/ActionBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { hours, locations, site, tiers } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--font-bricolage",
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Jammin Car Wash | Unlimited Car Wash Club in Lutz & Wesley Chapel, FL",
    template: "%s | Jammin Car Wash",
  },
  description:
    "Family-owned express car wash in Lutz and Wesley Chapel, FL. Unlimited Daily Wash Club from $25 a month (first month $14), License Plate Recognition express lanes and free shaded vacuums.",
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f5f8fb" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/logo.png`,
      telephone: site.phone.tel,
      sameAs: [site.facebook, site.currentSite],
    },
    ...locations.map((l) => ({
      "@type": "AutoWash",
      "@id": `${site.url}/locations/${l.slug}#wash`,
      name: `${site.name} ${l.name}`,
      url: `${site.url}/locations/${l.slug}`,
      image: `${site.url}${l.hero.src}`,
      telephone: site.phone.tel,
      parentOrganization: { "@id": `${site.url}/#org` },
      address: {
        "@type": "PostalAddress",
        streetAddress: l.street,
        addressLocality: l.city,
        addressRegion: "FL",
        postalCode: l.zip,
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng },
      hasMap: l.maps,
      openingHoursSpecification: hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${h.day}`,
        opens: h.open,
        closes: h.close,
      })),
      aggregateRating: { "@type": "AggregateRating", ratingValue: l.rating.value, reviewCount: l.rating.count, bestRating: 5 },
      makesOffer: tiers.map((t) => ({
        "@type": "Offer",
        name: `${t.name} Daily Wash Club (monthly)`,
        price: t.monthly,
        priceCurrency: "USD",
        url: site.join,
      })),
    })),
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable} antialiased`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only z-[60] rounded bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ActionBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
