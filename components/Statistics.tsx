"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import type { getStats } from "@/lib/members";

type Stats = ReturnType<typeof getStats>;

const fmt = (n: number) => String(Math.round(n)).padStart(2, "0");

/** Count-up saat masuk viewport. Nilai akhir sudah ada di HTML (tanpa JS tetap benar). */
function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const el = ref.current;
    el.textContent = fmt(0);
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = fmt(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {fmt(value)}
    </span>
  );
}

function Figure({
  value,
  label,
  large = false,
}: {
  value: number;
  label: string;
  large?: boolean;
}) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-3 font-mono text-[11px] tracking-[0.3em] text-mute">{label}</dt>
      <dd
        className={`font-display font-light leading-none ${
          large ? "text-[9rem] sm:text-[12rem] md:text-[14rem]" : "text-6xl md:text-7xl"
        }`}
      >
        <CountUp value={value} />
      </dd>
    </div>
  );
}

export function Statistics({ stats }: { stats: Stats }) {
  return (
    <section id="statistics" className="scroll-mt-20 border-t border-line py-28 md:py-44">
      <h2 className="sr-only">Statistik organisasi</h2>
      <Reveal className="mx-auto max-w-6xl px-6 md:px-10">
        <dl className="grid gap-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <Figure value={stats.total} label="TOTAL MEMBERS" large />
          </div>
          <div className="grid grid-cols-3 gap-6 border-t border-line pt-10 md:col-span-6 md:col-start-8 md:grid-cols-1 md:gap-10 md:border-t-0 md:border-l md:pl-12 md:pt-0">
            <Figure value={stats.founder} label="FOUNDERS" />
            <Figure value={stats.atmin} label="ATMIN" />
            <Figure value={stats.member} label="MEMBERS" />
          </div>
        </dl>
      </Reveal>
    </section>
  );
}
