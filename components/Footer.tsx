import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

const labelClass = "font-mono text-[11px] tracking-[0.3em] text-mute";
const linkClass = "inline-block py-1.5 text-sm text-ink/80 transition-colors duration-500 hover:text-ink";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-5xl font-light tracking-[0.3em]">{SITE.name}</p>
            <p className="mt-4 text-sm tracking-[0.18em] text-mute">{SITE.fullName}</p>
            <p className="mt-6 text-sm text-ink/80">Sub-organisasi dari {SITE.parentName}</p>
          </div>

          <nav aria-label="Navigasi footer" className="md:col-span-3 md:col-start-7">
            <p className={labelClass}>NAVIGATION</p>
            <ul className="mt-4">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className={labelClass}>OFFICIAL CHANNELS</p>
            <ul className="mt-4">
              <li>
                <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  YouTube
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <p className="max-w-xl text-xs leading-relaxed text-mute">{SITE.legal}</p>
          <p lang="en" className="mt-2 max-w-xl text-xs leading-relaxed text-mute/60">
            {SITE.legalEn}
          </p>
          <p className="mt-8 font-mono text-[11px] tracking-[0.22em] text-mute">{SITE.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
