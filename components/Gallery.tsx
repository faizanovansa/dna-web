"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ArchiveMedia } from "@/lib/types";

const pad = (n: number) => String(n).padStart(2, "0");

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
// Mode privasi (nocookie). Iframe baru dimuat setelah lightbox dibuka, jadi halaman tetap ringan.
const ytEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&autoplay=1`;

/** Placeholder bila file foto belum ada di /public. */
function Missing({ n }: { n: number }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-charcoal px-4 text-center font-mono text-[11px] tracking-[0.25em] text-mute">
      MEDIA {pad(n)} — BELUM TERSEDIA
    </div>
  );
}

/**
 * Galeri responsif + lightbox untuk foto dan video YouTube.
 * Desktop: tombol panah + keyboard (←/→/Esc). Mobile: swipe kiri/kanan pada foto.
 */
export function Gallery({ media }: { media: ArchiveMedia[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [failed, setFailed] = useState<Set<number>>(() => new Set());
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const isOpen = open !== null;
  const count = media.length;

  const markFailed = useCallback(
    (i: number) => setFailed((prev) => (prev.has(i) ? prev : new Set(prev).add(i))),
    [],
  );
  const go = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );
  const close = useCallback(() => {
    setOpen(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen, close, go]);

  if (count === 0) return null;

  const current = open !== null ? media[open] : null;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {media.map((m, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={
                m.type === "video"
                  ? `Putar video: ${m.title}`
                  : `Buka foto ${i + 1} dari ${count}`
              }
              className="group relative block aspect-[4/3] w-full overflow-hidden border border-line transition-[border-color] duration-500 hover:border-ink/50"
            >
              {m.type === "video" ? (
                <div className="relative h-full w-full bg-charcoal">
                  {!failed.has(i) && (
                    // Thumbnail resmi YouTube; <img> biasa agar tidak perlu konfigurasi domain.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ytThumb(m.videoId)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onError={() => markFailed(i)}
                      className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ink/60 bg-void/50 transition-colors duration-500 group-hover:bg-void/70">
                      <Play size={22} strokeWidth={1.25} className="ml-1" aria-hidden />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.3em]">VIDEO</span>
                  </span>
                </div>
              ) : failed.has(i) ? (
                <Missing n={i + 1} />
              ) : (
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                  onError={() => markFailed(i)}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && current && (
          <motion.div
            data-lightbox
            role="dialog"
            aria-modal="true"
            aria-label={current.type === "video" ? "Pemutar video" : "Galeri foto"}
            className="fixed inset-0 z-[65] flex flex-col bg-void/95"
            style={{ touchAction: "pan-y" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null || count < 2) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-6">
              <p className="font-mono text-xs tracking-[0.3em] text-mute">
                {pad(open + 1)} / {pad(count)}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Tutup"
                className="-mr-3 flex h-12 w-12 items-center justify-center"
              >
                <X size={22} strokeWidth={1.25} aria-hidden />
              </button>
            </div>

            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={open}
                  className="absolute inset-0 px-4 pb-4 md:px-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {current.type === "video" ? (
                    <div className="flex h-full w-full items-center justify-center">
                      <iframe
                        src={ytEmbed(current.videoId)}
                        title={current.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="aspect-video h-auto w-[min(100%,calc((100svh-6rem)*16/9))] border-0 bg-charcoal"
                      />
                    </div>
                  ) : (
                    <div className="relative h-full w-full">
                      {failed.has(open) ? (
                        <Missing n={open + 1} />
                      ) : (
                        <Image
                          src={current.src}
                          alt={current.alt}
                          fill
                          sizes="100vw"
                          onError={() => markFailed(open)}
                          className="object-contain"
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Sebelumnya"
                    className="absolute left-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ink/70 transition-colors hover:text-ink md:left-4"
                  >
                    <ChevronLeft size={28} strokeWidth={1.25} aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Berikutnya"
                    className="absolute right-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ink/70 transition-colors hover:text-ink md:right-4"
                  >
                    <ChevronRight size={28} strokeWidth={1.25} aria-hidden />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
