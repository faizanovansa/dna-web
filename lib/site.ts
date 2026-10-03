export const SITE = {
  name: "D•N•A",
  fullName: "Divergent · Nonconformity · Abnormal",
  parentName: "A•N•O",
  parentFullName: "Abnormal · Nonconformist · Organization",
  title: "D•N•A — Divergent · Nonconformity · Abnormal",
  description:
    "Kehadiran publik resmi dan arsip organisasi D•N•A, sub-organisasi independen dari A•N•O.",
  email: "podkv10@gmail.com",
  youtube: { label: "A•N•O Core", url: "https://youtube.com/@anocore" },
  legal:
    "D•N•A adalah organisasi independen dan tidak berafiliasi dengan institusi pemerintah maupun otoritas publik mana pun.",
  legalEn:
    "D•N•A is an independent organization and is not affiliated with any government institution or public authority.",
  copyright: "© 2026 D•N•A",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** Dasar konstitusional. Teks mengikuti naskah resmi UUD NRI 1945. */
export const CONSTITUTION = {
  article: "Pasal 28E Ayat (3) UUD NRI Tahun 1945",
  quote: "Setiap orang berhak atas kebebasan berserikat, berkumpul, dan mengeluarkan pendapat.",
  // Naskah UUD 1945 dalam satu naskah (JDIH Kemenkeu). Ganti URL ini jika ingin sumber resmi lain.
  sourceUrl:
    "https://jdih.kemenkeu.go.id/download/9d9e91bd-e9f0-4e8c-86f1-c6841cf834f3/UUD1945dlmsatunaskah.pdf",
} as const;

export const NAV = [
  { label: "ABOUT", href: "/#about" },
  { label: "MEMBERS", href: "/members" },
  { label: "ARCHIVE", href: "/archive" },
  { label: "STRUCTURE", href: "/#structure" },
  { label: "CONTACT", href: "/#contact" },
] as const;
