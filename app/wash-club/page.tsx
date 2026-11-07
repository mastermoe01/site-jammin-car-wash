import type { Metadata } from "next";
import { JoinBand, SectionHead } from "@/components/Blocks";
import { ClubCards } from "@/components/Clubs";
import { faq, site, tiers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Daily Wash Club & Wash Packages",
  description:
    "Jammin Car Wash prices: Basic, Good, Ceramic X3 and Graphene X5. Unlimited monthly clubs from $25, single washes from $14, annual plans (12 months for the price of 10) and family plans.",
  alternates: { canonical: "/wash-club" },
  openGraph: { url: "/wash-club" },
};

export default function WashClub() {
  return (
    <>
      <section className="pb-10 pt-12 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="label text-canopy">The Daily Wash Club</p>
          <h1 className="font-display mt-3 max-w-4xl text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
            Four washes. One club. Every day.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-2">
            Members wash once a day, every day, and use the License Plate Recognition express lane. {site.softTouch}
          </p>
        </div>
      </section>

      <section aria-label="Wash packages" className="pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <ClubCards />
        </div>
      </section>

      <section aria-labelledby="family" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHead kicker="Family plans" title="Save up to $20.00 monthly." id="family">
            Family Plans cover up to 2, 3 or 4 license plate tags. Our Family Plans can only be purchased at our location.
          </SectionHead>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">Monthly family plan prices by wash</caption>
              <thead>
                <tr className="border-b-2 border-ink">
                  <th scope="col" className="py-3 pr-4 font-bold">Plan</th>
                  {tiers.map((t) => (
                    <th key={t.id} scope="col" className="py-3 pr-4 font-bold">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="tnum">
                {(["2", "3", "4"] as const).map((n) => (
                  <tr key={n} className="border-b border-ink/10">
                    <th scope="row" className="py-4 pr-4 font-semibold">
                      Unlimited Family Plan for {n}
                    </th>
                    {tiers.map((t) => (
                      <td key={t.id} className="font-display py-4 pr-4 text-2xl font-bold">
                        ${t.family[n]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-ink-2">Monthly prices as published by Jammin. Ask the team at either location to set one up.</p>
        </div>
      </section>

      <section aria-labelledby="faq" className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead kicker="Questions" title="Membership FAQ" id="faq" />
            <a href={site.manage} target="_blank" rel="noopener" className="btn-ghost mt-8">
              Manage membership
            </a>
          </div>
          <dl className="divide-y divide-ink/10 lg:col-span-8">
            {faq.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-xl font-bold">{f.q}</dt>
                <dd className="mt-2 text-ink-2">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <JoinBand />
    </>
  );
}
