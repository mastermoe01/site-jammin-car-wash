import { existsSync } from "node:fs";
import path from "node:path";

// Video-slot contract (docs/design-principles.md §5): a video renders only when its file
// exists in public/videos/<subject-slug>/ at build time. Click-to-play from the poster.
type Family = "walkthrough" | "flyover";

const has = (subject: string, file: string) => existsSync(path.join(process.cwd(), "public", "videos", subject, file));

export function videosFor(subject: string, fallbackPoster: string, families: Family[] = ["flyover", "walkthrough"]) {
  return families
    .filter((f) => has(subject, `${f}.mp4`))
    .map((f) => ({
      family: f,
      src: `/videos/${subject}/${f}.mp4`,
      poster: has(subject, `poster-${f}.jpg`) ? `/videos/${subject}/poster-${f}.jpg` : fallbackPoster,
    }));
}

export function VideoSlot({
  subject,
  fallbackPoster,
  place,
  families,
  dark = false,
}: {
  subject: string;
  fallbackPoster: string;
  place: string;
  families?: Family[];
  dark?: boolean;
}) {
  const videos = videosFor(subject, fallbackPoster, families);
  if (videos.length === 0) return null;
  const titles: Record<Family, string> = { flyover: `${place} from above`, walkthrough: "Ride through the tunnel" };
  return (
    <section aria-labelledby={`video-${subject}`} className={dark ? "bg-tunnel py-20 text-white" : "py-20"}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className={`label ${dark ? "text-sky" : "text-canopy"}`}>{place}</p>
        <h2 id={`video-${subject}`} className="font-display mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
          See Jammin {place}
        </h2>
        <div className={`mt-10 grid gap-8 ${videos.length > 1 ? "md:grid-cols-2" : ""}`}>
          {videos.map((v) => (
            <figure key={v.family}>
              <video controls playsInline preload="metadata" poster={v.poster} className="aspect-video w-full rounded-[1.5rem] bg-tunnel object-cover">
                <source src={v.src} type="video/mp4" />
              </video>
              <figcaption className={`mt-3 text-sm ${dark ? "text-white/70" : "text-ink-2"}`}>{titles[v.family]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
