import Image from "next/image";
import Link from "next/link";
import { hoursSummary, locations, nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <Image src="/brand/logo.png" alt="Jammin Carwash" width={800} height={305} className="h-14 w-auto" />
          <p className="mt-5 max-w-sm text-ink-2">Family owned. Two express washes in Lutz and Wesley Chapel, Florida.</p>
          <p className="mt-5">
            <a href={`tel:${site.phone.tel}`} className="font-display text-2xl font-bold hover:text-canopy">
              {site.phone.display}
            </a>
            <span className="block text-sm text-ink-2">{site.phone.digits}</span>
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:col-span-5">
          {locations.map((l) => (
            <address key={l.slug} className="not-italic">
              <p className="label text-canopy">{l.name}</p>
              <p className="mt-2">
                {l.street}
                <br />
                {l.city}, FL {l.zip}
              </p>
              <a href={l.directions} target="_blank" rel="noopener" className="mt-2 inline-block font-semibold text-canopy underline-offset-4 hover:underline">
                Get directions
              </a>
            </address>
          ))}
          <div className="sm:col-span-2">
            <p className="label text-canopy">Hours, both locations</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
              {hoursSummary.map((h) => (
                <div key={h.label} className="contents">
                  <dt>{h.label}</dt>
                  <dd className="tnum font-semibold">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="space-y-2 font-semibold">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-canopy">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.manage} target="_blank" rel="noopener" className="hover:text-canopy">
                Manage membership
              </a>
            </li>
            <li>
              <a href={site.hiring} target="_blank" rel="noopener" className="hover:text-canopy">
                We&rsquo;re hiring
              </a>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noopener" className="hover:text-canopy">
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-6 text-sm text-ink-2 md:px-8">
          <p>Copyright © {site.legalMark} All Rights Reserved</p>
          <Image src="/brand/mascot.png" alt="" width={300} height={300} className="h-10 w-10" />
        </div>
      </div>
    </footer>
  );
}
