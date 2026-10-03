"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SITE } from "@/lib/site";

type Stage = "ano" | "dna" | "done";

const IntroContext = createContext(false);

/** true setelah loading screen selesai (atau dilewati). Dipakai Hero untuk memulai reveal. */
export const useIntroReady = () => useContext(IntroContext);

const SEEN_KEY = "dna-intro-seen";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Loading sequence: A•N•O (0–1.0s) → D•N•A (1.0–3.5s) → transisi (3.5–4.0s).
 * Halaman sudah dirender di bawah overlay, jadi tidak ada delay buatan pada konten.
 * Hanya tampil sekali per sesi, bisa dilewati (tombol Skip / Esc),
 * dan dilewati otomatis untuk prefers-reduced-motion.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<Stage>("ano");
  const [fast, setFast] = useState(false);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage bisa tidak tersedia */
    }
    setStage("done");
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* abaikan */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setFast(true);
      setStage("done");
      return;
    }
    const toDna = window.setTimeout(() => setStage("dna"), 1000);
    const toDone = window.setTimeout(finish, 3500);
    return () => {
      window.clearTimeout(toDna);
      window.clearTimeout(toDone);
    };
  }, [finish]);

  // Kunci scroll selama loading.
  useEffect(() => {
    if (stage === "done") return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [stage, finish]);

  return (
    <IntroContext.Provider value={stage === "done"}>
      {children}
      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            key="intro"
            data-intro
            className="fixed inset-0 z-50 flex items-center justify-center bg-void"
            exit={{ opacity: 0, filter: "blur(14px)", scale: 1.04 }}
            transition={{ duration: fast ? 0.01 : 0.5, ease: EASE }}
          >
            <AnimatePresence mode="wait">
              {stage === "ano" && (
                <motion.div
                  key="ano"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.96 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Image
                    src="/brand/ano-logo.webp"
                    alt="Lambang A•N•O"
                    width={400}
                    height={460}
                    priority
                    className="h-auto w-[min(34vw,150px)]"
                  />
                  <p className="mt-6 font-display text-3xl font-light tracking-[0.3em]">A•N•O</p>
                </motion.div>
              )}

              {stage === "dna" && (
                <motion.div
                  key="dna"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, filter: "blur(14px)", scale: 1.08 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  transition={{ duration: 1.3, ease: EASE }}
                >
                  <Image
                    src="/brand/dna-logo.webp"
                    alt="Lambang D•N•A"
                    width={600}
                    height={598}
                    priority
                    className="h-auto w-[min(62vw,300px)]"
                  />
                  <motion.p
                    className="mt-8 font-display text-5xl font-light sm:text-6xl"
                    initial={{ letterSpacing: "0.55em", opacity: 0 }}
                    animate={{ letterSpacing: "0.3em", opacity: 1 }}
                    transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
                  >
                    {SITE.name}
                  </motion.p>
                  <motion.span
                    aria-hidden
                    className="mt-5 block h-px w-40 origin-center bg-ink/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.6, delay: 0.6, ease: EASE }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={finish}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-3 font-mono text-[11px] tracking-[0.3em] text-mute transition-colors hover:text-ink"
            >
              LEWATI
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
