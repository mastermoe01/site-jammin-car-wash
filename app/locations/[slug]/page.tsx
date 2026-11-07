import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JoinBand, ReviewCard, Stars } from "@/components/Blocks";
import { Rise } from "@/components/Motion";
import { OpenNow } from "@/components/OpenNow";
import { VideoSlot } from "@/components/VideoSlot";
import { getLocation, hoursSummary, locations, site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const l = getLocation((await params).slug);
  if (!l) return {};
  return {
    title: `Car Wash in ${l.name}, FL — ${l.street}`,
    description: `Jammin Car Wash ${l.name}: ${l.street}, ${l.city}, FL ${l.zip}. ${l.rating.value}★ from ${l.rating.count} Google reviews. Unlimited Daily Wash Club, License Plate Recognition lane and free shaded vacuums. Open Mon–Sat 8–8, Sun 8–7.`,
    alternates: { canonical: `/locations/${l.slug}` },
    openGraph: { url: `/locations/${l.slug}`, images: [{ url: l.hero.src, alt: l.hero.alt }] },
  };
}

export default async function LocationPage({ params }: PageProps<"/locations/[slug]">) {
  const l = getLocation((await params).slug);
  if (!l) notFound();
  const max = Math.max(...l.rating.histogram);
  return (
    <>
      <section className="relative">
        <div className="relative h-[52vh] min-h-[340px] md:h-[68vh]">
          <Image src={l.hero.src} alt={l.hero.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-4 pb-10 text-white md:px-8">
              <p className="label text-sky">Jammin Car Wash</p>
              <h1 className="font-display mt-2 text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">{l.name}</h1>
              <address className="mt-3 text-lg not-italic text-white/90">
                {l.street}, {l.city}, FL {l.zip}
              </address>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={`Visit ${l.name}`} className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 md:px-8">
          <div className="rounded-[1.5rem] bg-card p-6">
            <h2 className="label text-canopy">Hours</h2>
            <OpenNow className="mt-3 font-semibold" />
            <dl className="mt-3 space-y-1">
              {hoursSummary.map((h) => (
                <div key={h.label} className="flex justify-between gap-4">
                  <dt>{h.label}</dt>
                  <dd className="tnum font-bold">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[1.5rem] bg-card p-6">
            <h2 className="label text-canopy">Get here</h2>
            <p className="mt-3">
              <a href={`tel:${site.phone.tel}`} className="font-display text-2xl font-bold hover:text-canopy">
                {site.phone.display}
              </a>
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={l.directions} target="_blank" rel="noopener" className="btn-join !bg-canopy !px-5 !py-2.5 hover:!bg-hose">
                Directions
              </a>
              <a href={l.maps} target="_blank" rel="noopener" className="btn-ghost !px-5 !py-2.5">
                Google Maps
              </a>
            </div>
          </div>
          <div className="rounded-[1.5rem] bg-card p-6">
            <h2 className="label text-canopy">On Google</h2>
            <p className="mt-3 flex items-center gap-3">
              <span className="font-display tnum text-4xl font-extrabold">{l.rating.value}</span>
              <span>
                <Stars value={l.rating.value} />
                <span className="tnum block text-sm text-ink-2">{l.rating.count.toLocaleString("en-US")} reviews</span>
              </span>
            </p>
            <ul className="mt-3 space-y-1" aria-label="Rating breakdown">
              {l.rating.histogram.map((n, i) => (
                <li key={i} className="flex items-center gap-2 text-xs">
                  <span className="tnum w-6">{5 - i}★</span>
                  <span className="h-1.5 flex-1 rounded bg-mist">
                    <span className="block h-full rounded bg-jam" style={{ width: `${(n / max) * 100}%` }} />
                  </span>
                  <span className="tnum w-8 text-right text-ink-2">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <VideoSlot subject={l.subject} fallbackPoster={l.hero.src} place={l.name} />

      <section aria-labelledby="photos" className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 id="photos" className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Around the {l.name} lot
          </h2>
          <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {l.gallery.map((p, i) => (
              <Rise key={p.src} delay={(i % 3) * 0.05} className="mb-5 break-inside-avoid">
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="w-full rounded-[1.25rem]" />
              </Rise>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-2">Photos from the Jammin {l.name} Google profile.</p>
        </div>
      </section>

      <section aria-labelledby="loc-reviews" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 id="loc-reviews" className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            What {l.name} drivers say
          </h2>
          <p className="mt-3 text-ink-2">Most mentioned in reviews: {l.topics.join(", ")}.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {l.reviews.map((r) => (
              <ReviewCard key={r.name} r={r} where={l.name} />
            ))}
          </div>
          <a href={l.review} target="_blank" rel="noopener" className="btn-ghost mt-8">
            Leave a review on Google
          </a>
        </div>
      </section>
      <JoinBand />
    </>
  );
}
