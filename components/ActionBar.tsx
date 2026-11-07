import Link from "next/link";
import { site } from "@/lib/site";

// Mobile thumb bar: the three errands (join, call, directions) one tap away on every page.
export function ActionBar() {
  return (
    <>
      <div aria-hidden="true" className="h-20 md:hidden" />
      <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 backdrop-blur md:hidden">
        <ul className="grid grid-cols-3 text-center text-sm font-bold">
          <li>
            <a href={site.join} target="_blank" rel="noopener" className="flex h-16 flex-col items-center justify-center bg-jam text-white">
              Join the Club
            </a>
          </li>
          <li>
            <a href={`tel:${site.phone.tel}`} className="flex h-16 flex-col items-center justify-center">
              Call
            </a>
          </li>
          <li>
            <Link href="/locations" className="flex h-16 flex-col items-center justify-center text-canopy">
              Directions
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
