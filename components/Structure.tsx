"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { Reveal } from "@/components/Reveal";
import { RoleBadge } from "@/components/RoleBadge";
import type { getStats } from "@/lib/members";
import { ROLES, ROLE_VARIANT } from "@/lib/roles";
import { SITE } from "@/lib/site";

type Stats = ReturnType<typeof getStats>;

const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/** Garis vertikal yang tergambar (transform scaleY, murah). */
function VLine({ h = 56, className = "" }: { h?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      style={{ height: h }}
      className={`block w-px origin-top bg-ink/40 ${className}`}
      initial={{ scaleY: reduce ? 1 : 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0 : 1.2, ease: EASE }}
    />
  );
}

/** Percabangan desktop: satu batang turun, tiga cabang ke role. */
function Branch() {
  const reduce = useReducedMotion();
  const draw = {
    initial: { pathLength: reduce ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: reduce ? 0 : 1.4, ease: EASE },
  } as const;
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 64"
      preserveAspectRatio="none"
      className="hidden h-16 w-full text-ink/40 md:block"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <motion.path d="M150 0 V32" vectorEffect="non-scaling-stroke" {...draw} />
      <motion.path d="M50 32 H250" vectorEffect="non-scaling-stroke" {...draw} />
      <motion.path d="M50 32 V64" vectorEffect="non-scaling-stroke" {...draw} />
      <motion.path d="M150 32 V64" vectorEffect="non-scaling-stroke" {...draw} />
      <motion.path d="M250 32 V64" vectorEffect="non-scaling-stroke" {...draw} />
    </svg>
  );
}

export function Structure({ stats }: { stats: Stats }) {
  return (
    <section id="structure" className="scroll-mt-20 border-t border-line py-28 md:py-44">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="sr-only">Struktur organisasi</h2>

        <Reveal className="flex flex-col items-center text-center">
          <p className="font-display text-5xl font-light tracking-[0.2em]">{SITE.parentName}</p>
          <p className="mt-3 font-mono text-[10px] tracking-[0.3em] text-mute">
            ABNORMAL · NONCONFORMIST · ORGANIZATION
          </p>
        </Reveal>

        <div className="flex flex-col items-center">
          <VLine h={64} className="my-6" />

          <Reveal className="text-center">
            <Link
              href="/members"
              className="group block border border-line px-10 py-6 transition-[border-color] duration-500 hover:border-ink/50"
            >
              <span className="block font-display text-5xl font-light tracking-[0.25em] sm:text-6xl">
                {SITE.name}
              </span>
              <span className="mt-3 block font-mono text-[10px] tracking-[0.3em] text-mute">
                DIVERGENT · NONCONFORMITY · ABNORMAL
              </span>
            </Link>
          </Reveal>

          <Branch />
          <VLine h={48} className="my-6 md:hidden" />
        </div>

        <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
          {ROLES.map((role, i) => (
            <li key={role}>
              <Reveal delay={i * 0.12}>
                <Link
                  href={`/members?role=${role}`}
                  className="group flex items-center gap-6 border border-line p-5 transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-ink/50 md:flex-col md:gap-4 md:px-6 md:py-9 md:text-center"
                >
                  <Avatar
                    variant={ROLE_VARIANT[role]}
                    size={88}
                    className="shrink-0 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="flex flex-col md:items-center">
                    <span className="font-display text-5xl font-light tabular-nums leading-none">
                      {pad(stats[role])}
                    </span>
                    <RoleBadge role={role} plural className="mt-3" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
