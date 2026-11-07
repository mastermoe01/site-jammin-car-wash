"use client";

import { useSyncExternalStore } from "react";
import { hours } from "@/lib/site";

// Open/closed from the real published hours, in Florida time. Server render shows nothing,
// so a cached page never claims a stale state.
function status() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const idx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  const hh = parts.find((p) => p.type === "hour")?.value ?? "00";
  const mm = parts.find((p) => p.type === "minute")?.value ?? "00";
  const now = `${hh === "24" ? "00" : hh}:${mm}`;
  const today = hours[idx];
  const fmt = (t: string) => {
    const h = Number(t.slice(0, 2));
    return `${h % 12 || 12} ${h < 12 ? "AM" : "PM"}`;
  };
  if (now >= today.open && now < today.close) return `Open now · until ${fmt(today.close)}`;
  if (now < today.open) return `Closed · opens ${fmt(today.open)}`;
  const next = hours[(idx + 1) % 7];
  return `Closed · opens ${fmt(next.open)} tomorrow`;
}

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};

export function OpenNow({ className = "" }: { className?: string }) {
  const text = useSyncExternalStore(subscribe, status, () => "");
  if (!text) return <span className={className}>&nbsp;</span>;
  const open = text.startsWith("Open");
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${open ? "bg-emerald-500" : "bg-ink/30"}`} />
      {text}
    </span>
  );
}
