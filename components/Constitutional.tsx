import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONSTITUTION, SITE } from "@/lib/site";

export function Constitutional() {
  return (
    <section id="constitution" className="scroll-mt-20 border-t border-line py-28 md:py-44">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-4">
          <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
            Constitutional Basis
          </h2>
          <p className="mt-3 text-sm tracking-[0.18em] text-mute">Kebebasan Berserikat</p>
          <p className="mt-10 font-mono text-[11px] leading-relaxed tracking-[0.22em] text-mute">
            {CONSTITUTION.article.toUpperCase()}
          </p>
        </Reveal>

        <div className="md:col-span-8">
          <Reveal delay={0.1}>
            <blockquote lang="id">
              <p className="font-display text-3xl font-light italic leading-snug sm:text-4xl md:text-5xl">
                “{CONSTITUTION.quote}”
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.25} className="mt-14 max-w-xl">
            <p className="text-sm leading-relaxed text-ink/80">
              Pasal ini menjamin kebebasan setiap orang untuk berserikat, berkumpul, dan
              mengeluarkan pendapat. Pasal ini tidak berarti sebuah organisasi diakui oleh, atau
              menjadi bagian dari, pemerintah.
            </p>

            <p className="mt-8 border-l border-line pl-5 text-sm leading-relaxed text-mute">
              Keberadaan {SITE.name} sebagai organisasi independen bukan berarti {SITE.name}{" "}
              merupakan lembaga pemerintah.
            </p>

            <a
              href={CONSTITUTION.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex min-h-12 items-center gap-2 border-b border-ink/30 py-2 font-mono text-[11px] tracking-[0.25em] text-ink/80 transition-colors duration-500 hover:border-ink hover:text-ink"
            >
              BACA NASKAH RESMI UUD 1945
              <ArrowUpRight size={14} strokeWidth={1.25} aria-hidden />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
