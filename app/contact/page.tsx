import type { Metadata } from "next";
import { LocationCards } from "@/components/Blocks";
import { faq, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call Jammin Car Wash at (813) 556-WASH, find directions to Lutz or Wesley Chapel, manage your membership or send us a message.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function Contact() {
  return (
    <>
      <section className="pb-10 pt-12 md:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label text-canopy">Contact us</p>
            <h1 className="font-display mt-3 text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">Talk to Jammin</h1>
            <p className="mt-6">
              <a href={`tel:${site.phone.tel}`} className="font-display text-4xl font-extrabold text-jam hover:text-jam-deep md:text-5xl">
                {site.phone.display}
              </a>
              <span className="mt-1 block text-ink-2">{site.phone.digits} · both locations</span>
            </p>
          </div>
          <div className="space-y-4 lg:col-span-5 lg:pt-10">
            {[
              { t: "Send us a message", b: "Use the contact request form on our current site.", href: site.contactForm, cta: "Contact request form" },
              { t: "Members", b: "Update your plate, card or plan, or cancel anytime.", href: site.manage, cta: "Manage membership" },
            ].map((c) => (
              <div key={c.t} className="rounded-[1.5rem] bg-card p-6">
                <h2 className="font-display text-2xl font-bold">{c.t}</h2>
                <p className="mt-1 text-ink-2">{c.b}</p>
                <a href={c.href} target="_blank" rel="noopener" className="mt-4 inline-block font-bold text-canopy hover:underline">
                  {c.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section aria-label="Locations" className="pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <LocationCards />
        </div>
      </section>
      <section aria-labelledby="faq" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h2 id="faq" className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            FAQ
          </h2>
          <div className="mt-8 divide-y divide-ink/10">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-bold">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl text-canopy transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
