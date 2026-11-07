import type { Metadata } from "next";
import Image from "next/image";
import { JoinBand, SectionHead } from "@/components/Blocks";
import { Rise } from "@/components/Motion";
import { difference, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Jammin",
  description:
    "Jammin Carwash® is a family owned business offering the latest in car wash technology: License Plate Recognition, Diamond Shine chemistry, soft touch cloth, free shaded vacuums and recycled water.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function About() {
  return (
    <>
      <section className="pb-12 pt-12 md:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-canopy">About Jammin</p>
            <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
              Family owned. Seriously equipped.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-2">{site.story}</p>
            <p className="mt-4 max-w-2xl text-lg text-ink-2">Stop by today and let us demonstrate our commitment to car wash excellence!</p>
          </div>
          <Rise className="lg:col-span-5">
            <Image
              src="/photos/lutz-team.webp"
              alt="Three members of the Jammin team outside the Lutz location"
              width={1822}
              height={2000}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full rounded-[1.75rem]"
            />
          </Rise>
        </div>
      </section>

      <section aria-labelledby="diff" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHead kicker="The Jammin difference" title="Five things you get every visit." id="diff" />
          <ol className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {difference.map((d, i) => (
              <li key={d.n}>
                <Rise delay={(i % 2) * 0.06}>
                  <p className="font-display tnum text-5xl font-extrabold text-jam">{d.n}</p>
                  <h2 className="font-display mt-2 text-3xl font-bold">{d.title}</h2>
                  <p className="mt-3 text-ink-2">{d.body}</p>
                </Rise>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="perks" className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3 md:px-8">
          <h2 id="perks" className="sr-only">
            The finishing area
          </h2>
          {[
            { src: "/photos/wc-mat-station.webp", alt: "Mat cleaner and towel station, Jammin Wesley Chapel", w: 2000, h: 1500 },
            { src: "/photos/lutz-amenities.webp", alt: "Jammin amenities sign: compressed air nozzles, glass cleaner, clean towels, crevice and wide vacuum nozzles, mat cleaners, 13' wide parking", w: 940, h: 788 },
            { src: "/photos/lutz-vacuums.webp", alt: "Shaded vacuum bays at Jammin Lutz", w: 960, h: 640 },
          ].map((p) => (
            <Rise key={p.src}>
              <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
            </Rise>
          ))}
        </div>
      </section>

      <section aria-labelledby="hiring" className="pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-ink p-8 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h2 id="hiring" className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Did you know we&rsquo;re hiring?
              </h2>
              <p className="mt-2 text-white/80">If you&rsquo;d like to be a part of a fast growing team then look no further. Apply online below.</p>
            </div>
            <a href={site.hiring} target="_blank" rel="noopener" className="btn-join">
              Employment form
            </a>
          </div>
        </div>
      </section>
      <JoinBand />
    </>
  );
}
