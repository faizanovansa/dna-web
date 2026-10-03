"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useIntroReady } from "@/components/IntroProvider";
import { SITE } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const WORDMARK = ["D", "•", "N", "•", "A"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroReady();
  const reduce = useReducedMotion();

  // Saat scroll: logo mengecil perlahan, hero memudar, parallax ringan.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const t = (delay: number, duration = 1.4) =>
    reduce ? { duration: 0 } : { duration, delay, ease: EASE };

  return (
    <section
      ref={ref}
      id="top"
      aria-label="D•N•A"
      className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden"
    >
      {/* Latar: vignette + cincin tipis yang tergambar perlahan */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-[-10%]"
      >
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_50%_46%,rgb(236_232_225/0.08),transparent_58%)]" />
        <svg
          viewBox="0 0 1000 1000"
          className="animate-slow-spin absolute left-1/2 top-1/2 h-[min(150vw,1100px)] w-[min(150vw,1100px)] -translate-x-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
        >
          <motion.circle
            cx="500"
            cy="500"
            r="470"
            strokeWidth="1"
            className="text-ink/15"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: ready ? 1 : reduce ? 1 : 0 }}
            transition={t(0.2, 3.2)}
          />
          <motion.circle
            cx="500"
            cy="500"
            r="360"
            strokeWidth="1"
            strokeDasharray="2 10"
            className="text-ink/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={t(1.2, 2)}
          />
        </svg>
      </motion.div>

      <motion.div
        style={{ scale, opacity: fade, y: contentY }}
        className="relative flex flex-col items-center px-6 pt-8 will-change-transform"
      >
        <h1 className="sr-only">{SITE.title}</h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 1.07, filter: "blur(16px)" }}
          animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : undefined}
          transition={t(0, 2)}
        >
          <div className="animate-float">
            <Image
              src="/brand/dna-logo.webp"
              alt="Lambang D•N•A"
              width={1000}
              height={996}
              priority
              sizes="(max-width: 768px) 74vw, 44svh"
              className="h-auto w-[min(74vw,44svh)]"
            />
          </div>
        </motion.div>

        <p
          aria-hidden
          className="mt-6 flex font-display text-5xl font-light tracking-[0.25em] sm:text-6xl"
        >
          {WORDMARK.map((ch, i) => (
            <motion.span
              key={i}
              initial={reduce ? false : { opacity: 0, filter: "blur(10px)" }}
              animate={ready ? { opacity: 1, filter: "blur(0px)" } : undefined}
              transition={t(0.7 + i * 0.12, 1.2)}
              className="inline-block"
            >
              {ch}
            </motion.span>
          ))}
        </p>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={t(1.6, 1.6)}
          className="mt-4 text-center text-[11px] tracking-[0.22em] text-mute sm:text-sm"
        >
          {SITE.fullName}
        </motion.p>
      </motion.div>

      <motion.a
        href="#about"
        style={{ opacity: cueOpacity }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 px-4 py-2 font-mono text-[11px] tracking-[0.35em] text-mute transition-colors hover:text-ink"
      >
        SCROLL
        <span aria-hidden className="animate-scroll-cue block h-10 w-px bg-ink/60" />
      </motion.a>
    </section>
  );
}
