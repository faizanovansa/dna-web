"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Tekan ESC untuk kembali ke daftar (penutup profil). Tidak merender apa pun. */
export function EscBack({ href }: { href: string }) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push(href);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router, href]);
  return null;
}
