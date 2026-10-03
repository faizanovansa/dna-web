"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC menutup menu, scroll dikunci saat menu terbuka.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    (href === "/members" || href === "/archive") && pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-void/95 to-transparent">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
          <Link
            href="/"
            className="font-display text-2xl font-light tracking-[0.3em]"
            aria-label={`${SITE.name} — beranda`}
          >
            {SITE.name}
          </Link>

          <nav aria-label="Navigasi utama" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="py-2 font-mono text-[11px] tracking-[0.3em] text-mute transition-colors duration-500 hover:text-ink aria-[current=page]:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-3 flex h-12 w-12 items-center justify-center md:hidden"
          >
            <Menu size={22} strokeWidth={1.25} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[55] flex flex-col bg-void md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-display text-2xl font-light tracking-[0.3em]">{SITE.name}</span>
              <button
                type="button"
                onClick={() => {
                  close();
                  menuButtonRef.current?.focus();
                }}
                aria-label="Tutup menu"
                className="-mr-3 flex h-12 w-12 items-center justify-center"
              >
                <X size={22} strokeWidth={1.25} />
              </button>
            </div>

            <nav aria-label="Navigasi utama" className="flex flex-1 items-center px-6">
              <ul className="w-full">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.label}
                    className="border-b border-line first:border-t"
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: EASE }}
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={close}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex min-h-16 items-center font-display text-4xl font-light tracking-[0.18em] text-ink/90 aria-[current=page]:text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <p className="px-6 pb-8 text-xs leading-relaxed text-mute">{SITE.legal}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
