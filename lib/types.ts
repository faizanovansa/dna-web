export type Role = "founder" | "atmin" | "member";

export type AvatarVariant = "gold" | "pink" | "white";

export type MemberStatus = "active";

export interface Member {
  /** Nomor ANO (1–16, dst). Sumber utama untuk id, urutan, dan label. */
  ano: number;
  /** Slug rute, mis. "ano-03" → /members/ano-03 */
  id: string;
  /** Nama samaran / public display name. Jangan isi nama asli. */
  displayName: string;
  role: Role;
  avatarVariant: AvatarVariant;
  status: MemberStatus;
  /** Opsional: kosongkan jika belum ada data, UI menyembunyikan field. */
  bio?: string;
  skills?: string[];
  /** Opsional: tambahan manual. Relasi utama diturunkan dari archive.relatedMembers. */
  relatedRecords?: string[];
}

export type ArchiveCategory = "event" | "document" | "media" | "announcement";

export type ArchiveStatus = "published" | "draft";

export interface ArchiveImage {
  /** Boleh dihilangkan; default "image". */
  type?: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArchiveVideo {
  type: "video";
  provider: "youtube";
  /** ID video YouTube (11 karakter). Gunakan defineVideo("url", "judul") agar ID diambil otomatis. */
  videoId: string;
  title: string;
}

export type ArchiveMedia = ArchiveImage | ArchiveVideo;

export interface ArchiveRecord {
  /** Slug rute huruf kecil, mis. "dna-rec-001" */
  id: string;
  title: string;
  category: ArchiveCategory;
  /** Format ISO: YYYY-MM-DD */
  date: string;
  /** Teks bebas, mis. "15:14 WIB" */
  time?: string;
  description: string;
  media: ArchiveMedia[];
  /** Daftar nomor ANO yang terlibat. */
  relatedMembers: number[];
  status: ArchiveStatus;
}
