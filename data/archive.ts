import { defineRecord, defineVideo } from "@/lib/define";
import type { ArchiveRecord } from "@/lib/types";

/**
 * ARCHIVE — dokumentasi organisasi.
 *
 * Dua foto pada DNA-REC-001 dihitung sebagai SATU record.
 * Judul dan deskripsi belum diberikan, jadi memakai placeholder netral.
 * Jangan menambahkan keterangan kegiatan yang belum dikonfirmasi.
 *
 * Media bisa berupa foto atau video YouTube:
 *   foto  : { src: "/archive/dna-rec-002/01.webp", alt: "...", width: 1600, height: 1200 }
 *   video : defineVideo("https://youtu.be/XXXXXXXXXXX", "Judul video")
 * (import { defineRecord, defineVideo } from "@/lib/define")
 */
export const archive: ArchiveRecord[] = [
  defineRecord({
    id: "dna-rec-001",
    title: "Untitled Record",
    // Kategori belum dikonfirmasi; "media" dipakai karena isinya berupa foto.
    category: "media",
    date: "2026-07-27",
    time: "15:14 WIB",
    description: "Belum ada deskripsi.",
    media: [
      {
        src: "/archive/dna-rec-001/01.webp",
        alt: "Dokumentasi DNA-REC-001, foto 1 dari 2",
        width: 1200,
        height: 900,
      },
      {
        src: "/archive/dna-rec-001/02.webp",
        alt: "Dokumentasi DNA-REC-001, foto 2 dari 2",
        width: 1200,
        height: 900,
      },
    ],
    relatedMembers: [1, 2, 3, 4, 5, 13],
    status: "published",
  }),
  defineRecord({
    id: "dna-rec-002",
    title: "Unknown Project",
    // Kategori belum dikonfirmasi; "media" dipakai karena isinya video.
    category: "media",
    // Dua video dari satu kegiatan: 28 April 2026 (video 1) dan 29 April 2026 (video 2).
    // Tanggal record memakai tanggal paling awal.
    date: "2026-04-28",
    description: "Belum ada deskripsi.",
    media: [
      defineVideo("https://youtu.be/ZPYsE354FX4", "Video 1 — 28 April 2026"),
      defineVideo("https://youtu.be/jAeASWR1p8k", "Video 2 — 29 April 2026"),
    ],
    relatedMembers: [1, 2, 3, 4, 5, 7],
    status: "published",
  }),
];
