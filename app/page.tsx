import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JoinBand, LocationCards, ReviewCard, SectionHead } from "@/components/Blocks";
import { PriceStrip } from "@/components/Clubs";
import { LaneProgress, Pan, Rise, RollIn } from "@/components/Motion";
import { HeroCurtain } from "@/components/three/HeroCurtain";
import { VideoSlot } from "@/components/VideoSlot";
import { cheapest, difference, locations, site, totalReviews } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const lpr = [
  { t: "Join online or on site", b: "Pick your club and register one plate." },
  { t: "Pull into the members' lane", b: "The License Plate Recognition machine reads and accepts your vehicle." },
  { t: "Roll through the tunnel", b: "Soft touch cloth and Diamond Shine chemistry, layered step by step." },
  { t: "Finish at the free vacuums", b: "Shaded bays with towels, compressed air, glass cleaner and mat cleaners." },
];

export default function Home() {
  const lutz = locations[0];
  const wc = locations[1];
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 md:px-8 md:pt-16 lg:grid-cols-12 lg:pb-20">
          <div className="relative z-10 lg:col-span-7">
            <p className="label text-canopy">Family owned · Lutz &amp; Wesley Chapel, FL</p>
            <h1 id="hero" className="font-display mt-4 text-[clamp(3.4rem,9vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
              Get Jammin
              <span className="text-jam">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-ink-2 md:text-2xl">
              The Daily Wash Club: unlimited washes, once a day, every day. Members skip ahead in the License Plate Recognition lane.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={site.join} target="_blank" rel="noopener" className="btn-join text-lg">
                Join from ${cheapest.first_month} your first month
              </a>
              <Link href="/wash-club" className="btn-ghost">
                See wash packages
              </Link>
            </div>
            <div className="mt-10">
              <PriceStrip />
              <p className="mt-3 text-sm text-ink-2">{site.softTouch}</p>
            </div>
          </div>
          <div className="relative min-h-[340px] lg:col-span-5 lg:min-h-[640px]">
            <HeroCurtain />
          </div>
        </div>
      </section>

      {/* Locations */}
      <section aria-labelledby="locations" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHead kicker="Two washes, same hours" title="Pick the closer one." id="locations">
            Open Monday to Saturday 8 AM – 8 PM and Sunday 8 AM – 7 PM. A third Jammin is coming soon at {site.comingSoon}.
          </SectionHead>
          <Rise className="mt-10">
            <LocationCards />
          </Rise>
        </div>
      </section>

      {/* The Jammin difference */}
      <section aria-labelledby="difference" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHead kicker="The Jammin difference" title="Faster in, shinier out." id="difference">
            {site.story}
          </SectionHead>
          <LaneProgress>
            <ol className="relative mt-12 grid gap-8 md:grid-cols-4">
              {lpr.map((s, i) => (
                <li key={s.t}>
                  <RollIn delay={i * 0.06}>
                    <span className="font-display tnum relative z-10 grid h-10 w-10 place-items-center rounded-full bg-ink text-lg font-extrabold text-white">
                      {i + 1}
                    </span>
                    <h3 className="font-display mt-4 text-2xl font-bold">{s.t}</h3>
                    <p className="mt-2 text-ink-2">{s.b}</p>
                  </RollIn>
                </li>
              ))}
            </ol>
          </LaneProgress>

          <div className="mt-20 grid gap-6 lg:grid-cols-12">
            <Rise className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
              <Image src="/photos/wc-vacuum-i4.webp" alt="A freshly washed BMW i4 at the shaded free vacuums, Jammin Wesley Chapel" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            </Rise>
            <div className="grid gap-6 lg:col-span-5">
              {difference.slice(1).map((d) => (
                <Rise key={d.n}>
                  <div className="rounded-[1.5rem] bg-concrete p-6">
                    <p className="font-display tnum text-sm font-bold text-jam">{d.n}</p>
                    <h3 className="font-display mt-1 text-2xl font-bold">{d.title}</h3>
                    <p className="mt-2 text-ink-2">{d.body}</p>
                  </div>
                </Rise>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tunnel band */}
      <section aria-labelledby="tunnel" className="overflow-hidden bg-tunnel py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="label text-sky">Inside the tunnel</p>
          <h2 id="tunnel" className="font-display mt-3 max-w-3xl text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            “My children love all the different color lights.”
          </h2>
          <p className="mt-4 text-white/70">Dee S, Google review of Jammin Lutz</p>
        </div>
        <Pan className="mt-12" distance={70}>
          <div className="flex gap-5 pl-4 md:pl-8">
            {[
              { src: "/photos/lutz-tunnel-lights.webp", alt: "A Camaro covered in foam under red and violet tunnel lights at Jammin Lutz", w: 2000, h: 1125 },
              { src: "/photos/lutz-tunnel-jeep.webp", alt: "A Jeep in the Jammin Lutz tunnel light show", w: 720, h: 720 },
              { src: "/photos/lutz-tunnel-entrance.webp", alt: "A team member guiding a car into the Jammin Lutz tunnel", w: 1024, h: 768 },
            ].map((p) => (
              <div key={p.src} className="relative h-[260px] shrink-0 overflow-hidden rounded-[1.5rem] md:h-[420px]" style={{ aspectRatio: `${p.w}/${p.h}` }}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 50vw, 90vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Pan>
      </section>
      <VideoSlot subject={lutz.subject} fallbackPoster="/photos/lutz-tunnel-lights.webp" place="Lutz" families={["walkthrough"]} dark />

      {/* Reviews */}
      <section aria-labelledby="reviews" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHead kicker="Google reviews" title={`${totalReviews.toLocaleString("en-US")} reviews and counting.`} id="reviews">
            {lutz.name} {lutz.rating.value} ★ ({lutz.rating.count.toLocaleString("en-US")}) · {wc.name} {wc.rating.value} ★ ({wc.rating.count}). The
            most-mentioned topic at both: the vacuums.
          </SectionHead>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { r: lutz.reviews[0], where: lutz.name },
              { r: wc.reviews[0], where: wc.name },
              { r: wc.reviews[1], where: wc.name },
            ].map(({ r, where }, i) => (
              <Rise key={r.name} delay={i * 0.06}>
                <ReviewCard r={r} where={where} />
              </Rise>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {locations.map((l) => (
              <a key={l.slug} href={l.review} target="_blank" rel="noopener" className="btn-ghost text-sm">
                Review Jammin {l.name} on Google
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet + fundraising */}
      <section aria-labelledby="groups" className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8">
          <h2 id="groups" className="sr-only">
            Fleet and fundraising programs
          </h2>
          {[
            { k: "Fleet program", t: "10 or more vehicles?", b: "Flexible wash programs for auto sales, rentals, limo services and more.", href: "/fleet-and-fundraising#fleet" },
            { k: "Fundraising program", t: "Raising money for a good cause?", b: "A fast, simple program for churches, schools, teams, fraternities and 501(c)(3) organizations.", href: "/fleet-and-fundraising#fundraising" },
          ].map((c) => (
            <Link key={c.k} href={c.href} className="group rounded-[1.75rem] border border-ink/10 p-7 transition-colors hover:border-canopy md:p-9">
              <p className="label text-canopy">{c.k}</p>
              <p className="font-display mt-3 text-3xl font-extrabold tracking-tight">{c.t}</p>
              <p className="mt-3 text-ink-2">{c.b}</p>
              <span className="mt-5 inline-block font-bold text-canopy group-hover:underline">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      <JoinBand />
    </>
  );
}
