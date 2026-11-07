import type { Metadata } from "next";
import { LocationCard } from "@/components/Blocks";
import { hoursSummary, locations, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations & Hours",
  description:
    "Jammin Car Wash locations: 21356 Walmart Way, Lutz, FL 33549 and 3706 Windcrest Dr, Wesley Chapel, FL 33544. Open Mon–Sat 8 AM–8 PM, Sun 8 AM–7 PM.",
  alternates: { canonical: "/locations" },
  openGraph: { url: "/locations" },
};

export default function Locations() {
  return (
    <>
      <section className="pb-10 pt-12 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="label text-canopy">Locations &amp; hours</p>
          <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
            Lutz &amp; Wesley Chapel
          </h1>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-lg">
            {hoursSummary.map((h) => (
              <div key={h.label}>
                <dt className="inline text-ink-2">{h.label}: </dt>
                <dd className="tnum inline font-bold">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section aria-label="Our locations" className="pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8">
          {locations.map((l) => (
            <LocationCard key={l.slug} l={l} headingLevel={2} />
          ))}
        </div>
      </section>
      <section aria-labelledby="soon" className="pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="rounded-[1.75rem] border-2 border-dashed border-ink/20 p-7 md:p-10">
            <p className="label text-jam">Coming soon</p>
            <h2 id="soon" className="font-display mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
              More locations coming soon
            </h2>
            <p className="mt-2 text-lg text-ink-2">{site.comingSoon}</p>
          </div>
        </div>
      </section>
    </>
  );
}
