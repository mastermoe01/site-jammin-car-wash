import type { MetadataRoute } from "next";
import { locations, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/wash-club", "/locations", ...locations.map((l) => `/locations/${l.slug}`), "/about", "/fleet-and-fundraising", "/contact"];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.8 }));
}
