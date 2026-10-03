import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

const ctaClass =
  "inline-flex min-h-12 items-center gap-3 border border-ink/40 px-7 py-4 font-mono text-xs tracking-[0.3em] transition-colors duration-500 hover:bg-ink hover:text-void";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-28 md:py-44">
      <div className="mx-auto grid max-w-6xl gap-20 px-6 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-6">
          <h2 className="font-display text-5xl font-light leading-tight sm:text-6xl">
            CONTACT {SITE.name}
          </h2>
          <p className="mt-8 text-sm text-ink/80">Untuk komunikasi resmi:</p>
          <p className="mt-2 break-all font-mono text-sm tracking-wide">{SITE.email}</p>
          <a href={`mailto:${SITE.email}`} className={`${ctaClass} mt-10`}>
            <Mail size={16} strokeWidth={1.25} aria-hidden />
            CONTACT US
          </a>
          <p className="mt-8 font-mono text-[11px] tracking-[0.22em] text-mute">
            Membership bersifat internal.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-5 md:col-start-8">
          <h3 className="font-mono text-[11px] tracking-[0.3em] text-mute">OFFICIAL CHANNELS</h3>
          <div className="mt-6 border-t border-line pt-8">
            <p className="font-mono text-[11px] tracking-[0.22em] text-mute">YOUTUBE</p>
            <p className="mt-3 font-display text-4xl font-light">{SITE.youtube.label}</p>
            <a
              href={SITE.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${ctaClass} mt-8`}
            >
              VISIT CHANNEL
              <ArrowUpRight size={16} strokeWidth={1.25} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
