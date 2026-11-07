import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fleet & Fundraising Programs",
  description:
    "Jammin Car Wash fleet program for companies with 10 or more vehicles, and a simple fundraising program for churches, schools, athletic teams, fraternities and 501(c)(3) organizations.",
  alternates: { canonical: "/fleet-and-fundraising" },
  openGraph: { url: "/fleet-and-fundraising" },
};

export default function Groups() {
  return (
    <>
      <section className="pb-10 pt-12 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="label text-canopy">For businesses and causes</p>
          <h1 className="font-display mt-3 max-w-4xl text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
            Fleet &amp; fundraising
          </h1>
        </div>
      </section>

      <section id="fleet" aria-labelledby="fleet-h" className="scroll-mt-24 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="label text-jam">Fleet program</p>
            <h2 id="fleet-h" className="font-display mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
              Get your company Jammin
            </h2>
            <p className="mt-4 text-lg text-ink-2">
              At Jammin Car Wash we understand the importance of keeping your fleet sparkling clean. We are committed to helping you make a first impression.
            </p>
            <p className="mt-3 text-lg text-ink-2">
              We have wash programs that are flexible to suit your needs. Fill out the form to get started if you have 10 or more vehicles.
            </p>
            <p className="mt-3 text-ink-2">Fleet types: auto sales, vehicle rentals, limo service and others.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.fleetForm} target="_blank" rel="noopener" className="btn-join">
                Fleet info request form
              </a>
              <a href={`tel:${site.phone.tel}`} className="btn-ghost">
                Call {site.phone.display}
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Image src="/photos/wc-building.webp" alt="The Jammin Wesley Chapel tunnel exit and vacuum lot" width={1920} height={1080} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full rounded-[1.75rem]" />
          </div>
        </div>
      </section>

      <section id="fundraising" aria-labelledby="fund-h" className="scroll-mt-24 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="label text-jam">Fundraising program</p>
          <h2 id="fund-h" className="font-display mt-2 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
            A fast, simple and highly effective way to raise money
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-2">
            Jammin Car Wash fundraising provides a fast, simple and highly effective program for non-profit organizations to raise money. Just fill out the form to get started.
          </p>
          <h3 className="font-display mt-10 text-2xl font-bold">Who can participate?</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {["Churches", "Fraternities", "Schools", "Athletic Teams", "501 (C) (3) Organizations"].map((w) => (
              <li key={w} className="rounded-full bg-mist px-4 py-2 font-semibold">
                {w}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-2">Email us for Program Rules and participation.</p>
          <a href={site.fundraisingForm} target="_blank" rel="noopener" className="btn-join mt-6">
            Fundraiser form
          </a>
        </div>
      </section>
    </>
  );
}
