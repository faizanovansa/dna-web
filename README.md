# D•N•A

Kehadiran publik resmi dan arsip organisasi D•N•A, sub-organisasi independen dari A•N•O.

## Menjalankan

```bash
npm install
npm run dev
```

Deploy: hubungkan repo GitHub ke Vercel (framework Next.js terdeteksi otomatis).
Opsional: set `NEXT_PUBLIC_SITE_URL` di Vercel untuk canonical URL.

## Data

- `data/members.ts` — registry anggota. Tambah satu baris `defineMember(...)`, semua statistik, search, filter, dan relasi ikut otomatis.
- `data/archive.ts` — record arsip. DNA-REC-001 memakai placeholder sampai judul dan deskripsi diberikan.
- Foto arsip: simpan sebagai `public/archive/dna-rec-001/01.webp` dan `02.webp`.

## Aturan konten

Jangan menulis sejarah, biodata, skill, atau klaim organisasi yang belum dikonfirmasi founder.
Kosongkan field (bio, skills) sampai ada data resmi.

## Aset brand

`public/brand/` — logo D•N•A, logo A•N•O, dan avatar Incognito (gold / pink / white), diproses dari file resmi dengan latar transparan.

## Bahasa

Seluruh teks website berbahasa Indonesia. Istilah/label teknis tetap bahasa aslinya
(ABOUT, MEMBERS, ARCHIVE, FOUNDER, ATMIN, SCROLL, CONTACT US, dst.).
Teks dasar ada di `lib/site.ts` dan masing-masing komponen di `components/`.

## Status

- Tahap 1: fondasi (selesai)
- Tahap 2: homepage — loading, hero, about, constitutional basis, statistik, struktur, contact, footer (selesai)
- Tahap 3: `/members`, `/members/ano-XX`, `/archive`, `/archive/dna-rec-001`, SEO — sitemap, robots, OG, ikon (selesai)

## Foto arsip DNA-REC-001

Sampai file foto ada, galeri menampilkan placeholder "BELUM TERSEDIA" (tidak error).
Simpan foto sebagai `public/archive/dna-rec-001/01.webp` dan `02.webp`, lalu sesuaikan
`width` / `height` di `data/archive.ts` dengan ukuran asli foto.

Konversi di Termux (opsional, agar ringan):

```bash
pkg install libwebp
cwebp -q 80 -resize 1600 0 foto.jpg -o 01.webp
```

## Menambah record archive

Tambah satu blok `defineRecord({...})` di `data/archive.ts`. Media bisa foto atau video YouTube:

```ts
import { defineRecord, defineVideo } from "@/lib/define";

media: [
  { src: "/archive/dna-rec-002/01.webp", alt: "Keterangan foto", width: 1600, height: 1200 },
  defineVideo("https://youtu.be/XXXXXXXXXXX", "Judul video"),
],
```

`defineVideo` menerima link YouTube biasa (youtu.be, watch?v=, shorts, live) atau langsung ID videonya.
Video dibuka di lightbox memakai youtube-nocookie dan baru dimuat setelah diklik, jadi halaman tetap ringan.

## Catatan

- `/members?role=founder` memfilter otomatis; search dan filter bisa digabung.
- Menambah anggota: cukup tambah satu baris di `data/members.ts`.
- Gambar OG: `public/og.png`, ikon: `app/icon.png` dan `app/apple-icon.png`.
- Set `NEXT_PUBLIC_SITE_URL` di Vercel (mis. `https://domain-kamu.vercel.app`) agar canonical, sitemap, dan OG memakai domain yang benar.
