import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-concrete/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <Link href="/" className="shrink-0" aria-label="Jammin Car Wash home">
          <Image src="/brand/logo.png" alt="Jammin Carwash" width={800} height={305} priority className="h-10 w-auto md:h-12" />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-semibold">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-canopy">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.manage} className="hidden text-sm font-semibold text-ink-2 hover:text-canopy md:inline" target="_blank" rel="noopener">
            Manage membership
          </a>
          <a href={site.join} className="btn-join !px-5 !py-2.5 text-sm" target="_blank" rel="noopener">
            Join the Club
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
