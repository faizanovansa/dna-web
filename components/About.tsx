"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Garis penghubung A•N•O → D•N•A, tergambar saat masuk viewport. */
function Connector() {
  const reduce = useReducedMotion();
  const draw = {
    initial: { pathLength: reduce ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: reduce ? 0 : 1.6, ease: EASE },
  } as const;
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 150"
      className="h-[110px] w-3 text-ink/50 md:h-[150px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <motion.line x1="6" y1="0" x2="6" y2="146" {...draw} />
      <motion.polyline points="1,138 6,148 11,138" {...draw} />
    </svg>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-28 md:py-44">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="sr-only">Tentang A•N•O dan D•N•A</h2>

        {/* A•N•O — organisasi induk */}
        <div className="grid items-start gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h3 className="font-display text-7xl font-light tracking-[0.12em] sm:text-8xl md:text-9xl">
              {SITE.parentName}
            </h3>
            <p className="mt-5 font-mono text-[11px] tracking-[0.3em] text-mute">
              ABNORMAL · NONCONFORMIST · ORGANIZATION
            </p>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink/80">
              Organisasi induk yang berdiri secara independen.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-3 md:col-start-10 md:justify-self-end">
            <Image
              src="/brand/ano-logo.webp"
              alt="Lambang A•N•O"
              width={400}
              height={460}
              sizes="(max-width: 768px) 120px, 170px"
              className="h-auto w-[120px] opacity-60 md:w-[170px]"
            />
          </Reveal>
        </div>

        {/* Konektor */}
        <div className="my-6 md:my-10 md:ml-[8.33%]">
          <Connector />
        </div>

        {/* D•N•A — sub-organisasi */}
        <div className="grid items-center gap-12 md:grid-cols-12 md:pl-[8.33%]">
          <Reveal className="md:col-span-7">
            <h3 className="font-display text-7xl font-light tracking-[0.12em] sm:text-8xl md:text-9xl">
              {SITE.name}
            </h3>
            <p className="mt-5 font-mono text-[11px] tracking-[0.3em] text-mute">
              DIVERGENT · NONCONFORMITY · ABNORMAL
            </p>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink/80">
              Sub-organisasi dari {SITE.parentName}.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-5">
            <Image
              src="/brand/dna-logo.webp"
              alt="Lambang D•N•A"
              width={1000}
              height={996}
              sizes="(max-width: 768px) 80vw, 420px"
              className="h-auto w-[min(80vw,300px)] md:w-full md:max-w-[420px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
