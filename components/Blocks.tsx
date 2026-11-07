import Image from "next/image";
import Link from "next/link";
import { OpenNow } from "@/components/OpenNow";
import { locations, site, type Location, type Review } from "@/lib/site";

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-jam ${className}`} aria-label={`${value} out of 5 stars`} role="img">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" className={i < Math.round(value) ? "" : "opacity-25"}>
          <path fill="currentColor" d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </span>
  );
}

export function SectionHead({ kicker, title, id, children }: { kicker: string; title: string; id: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="label text-canopy">{kicker}</p>
      <h2 id={id} className="font-display mt-3 text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
        {title}
      </h2>
      {children && <div className="mt-5 text-lg text-ink-2">{children}</div>}
    </div>
  );
}

export function LocationCard({ l, headingLevel = 3 }: { l: Location; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group overflow-hidden rounded-[1.75rem] bg-card shadow-[0_1px_0_rgb(11_27_58/0.06),0_20px_50px_-30px_rgb(11_27_58/0.35)]">
      <Link href={`/locations/${l.slug}`} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Image src={l.hero.src} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </Link>
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <H className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            <Link href={`/locations/${l.slug}`} className="hover:text-canopy">
              {l.name}
            </Link>
          </H>
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            <Stars value={l.rating.value} /> <span className="tnum">{l.rating.value}</span>
            <span className="tnum text-ink-2">({l.rating.count.toLocaleString("en-US")})</span>
          </span>
        </div>
        <address className="mt-2 not-italic text-ink-2">
          {l.street}, {l.city}, FL {l.zip}
        </address>
        <OpenNow className="mt-3 text-sm font-semibold" />
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={l.directions} target="_blank" rel="noopener" className="btn-join !bg-canopy hover:!bg-hose">
            Directions
          </a>
          <a href={`tel:${site.phone.tel}`} className="btn-ghost">
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </article>
  );
}

export function LocationCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {locations.map((l) => (
        <LocationCard key={l.slug} l={l} />
      ))}
    </div>
  );
}

export function ReviewCard({ r, where }: { r: Review; where: string }) {
  return (
    <figure className="flex h-full flex-col rounded-[1.5rem] bg-card p-6 md:p-7">
      <Stars value={r.stars} />
      <blockquote className="mt-4 flex-1 whitespace-pre-line text-[1.02rem] leading-relaxed">“{r.text}”</blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-bold">{r.name}</span>
        {r.badge && <span className="text-ink-2"> · {r.badge}</span>}
        <span className="block text-ink-2">Google review · {where}</span>
      </figcaption>
    </figure>
  );
}

export function JoinBand() {
  return (
    <section aria-labelledby="join-band" className="bg-jam text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center md:px-8">
        <div>
          <h2 id="join-band" className="font-display text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
            Wash once a day, every day.
          </h2>
          <p className="mt-3 text-lg text-white/85">Join online in a minute, or stop by either location.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={site.join} target="_blank" rel="noopener" className="inline-flex items-center rounded-full bg-white px-6 py-3.5 font-bold text-jam hover:bg-concrete">
            Join the Daily Wash Club
          </a>
          <a href={site.manage} target="_blank" rel="noopener" className="inline-flex items-center rounded-full border-2 border-white/70 px-6 py-3 font-bold hover:bg-white/10">
            Manage membership
          </a>
        </div>
      </div>
    </section>
  );
}
