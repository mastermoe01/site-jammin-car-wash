"use client";

import { useState } from "react";
import { items, site, tiers } from "@/lib/site";

type Mode = "monthly" | "single" | "annual";
const modes: { id: Mode; label: string }[] = [
  { id: "monthly", label: "Monthly club" },
  { id: "single", label: "Single wash" },
  { id: "annual", label: "Annual plan" },
];

// Short strip under the hero: all four clubs, monthly price + first month, one tap to join.
export function PriceStrip() {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {tiers.map((t, i) => (
        <li key={t.id}>
          <a
            href={site.join}
            target="_blank"
            rel="noopener"
            className={`block h-full rounded-2xl border p-4 transition-colors hover:border-jam ${
              i === tiers.length - 1 ? "border-ink bg-ink text-white" : "border-ink/12 bg-white"
            }`}
          >
            <span className="block text-sm font-bold">{t.name}</span>
            <span className="font-display tnum mt-1 block text-3xl font-extrabold leading-none">
              ${t.monthly}
              <span className="text-base font-semibold opacity-70">/mo</span>
            </span>
            <span className={`mt-2 block text-xs font-semibold ${i === tiers.length - 1 ? "text-sky" : "text-jam"}`}>
              First month ${t.first_month}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ClubCards() {
  const [mode, setMode] = useState<Mode>("monthly");
  return (
    <div>
      <div role="radiogroup" aria-label="Pricing" className="inline-flex rounded-full bg-mist p-1">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors md:px-5 ${mode === m.id ? "bg-ink text-white" : "text-ink-2 hover:text-ink"}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-ink-2" aria-live="polite">
        {mode === "monthly" && "Wash once a day, every day. Your first month costs the single-wash price."}
        {mode === "single" && "One wash, no membership. Free vacuums are included with every car wash purchase."}
        {mode === "annual" && "Get 12 months for the price of 10! Annual plans are only valid for 1 license plate tag."}
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {tiers.map((t, i) => {
          const top = i === tiers.length - 1;
          const price = mode === "monthly" ? t.monthly : mode === "single" ? t.single : t.annual;
          const unit = mode === "monthly" ? "/month" : mode === "single" ? "per wash" : "/year";
          const added = i === 0 ? t.includes : t.includes.filter((x) => !tiers[i - 1].includes.includes(x));
          return (
            <article
              key={t.id}
              className={`flex flex-col rounded-[1.75rem] p-6 md:p-7 ${top ? "bg-ink text-white" : "bg-card"}`}
              aria-labelledby={`tier-${t.id}`}
            >
              <h3 id={`tier-${t.id}`} className="font-display text-2xl font-extrabold tracking-tight">
                {t.name}
              </h3>
              <p className="mt-4">
                <span className="font-display tnum text-6xl font-extrabold leading-none">${price}</span>{" "}
                <span className="font-semibold opacity-70">{unit}</span>
              </p>
              {mode === "monthly" && (
                <p className={`mt-2 text-sm font-bold ${top ? "text-sky" : "text-jam"}`}>${t.first_month} for your first month</p>
              )}
              <a
                href={site.join}
                target="_blank"
                rel="noopener"
                className={`mt-6 ${top ? "btn-join" : "btn-join"}`}
              >
                {mode === "single" ? "Visit us" : mode === "annual" ? "Buy an Annual Plan" : `Join ${t.name}`}
              </a>
              <details className="group mt-6 border-t border-current/15 pt-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                  What&rsquo;s included ({t.includes.length})
                  <span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-3 space-y-3 text-sm">
                  {t.includes.map((name) => (
                    <li key={name}>
                      <span className="font-bold">{name}</span>
                      {items[name] && <span className={`block ${top ? "text-white/70" : "text-ink-2"}`}>{items[name]}</span>}
                    </li>
                  ))}
                </ul>
              </details>
              {i > 0 && (
                <p className={`mt-4 text-xs ${top ? "text-white/60" : "text-ink-2"}`}>Adds: {added.join(", ")}</p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
