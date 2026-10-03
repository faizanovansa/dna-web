import { defineMember } from "@/lib/define";
import type { Member } from "@/lib/types";

/**
 * MEMBER REGISTRY — satu-satunya sumber data anggota.
 *
 * - Semua nama adalah nama samaran / public display name. Jangan isi nama asli.
 * - Field bio / skills dikosongkan sampai ada data resmi. Jangan diisi dengan karangan.
 * - Menambah anggota: tambahkan satu baris di sini. Statistik, search, filter,
 *   struktur, dan related records akan ikut berubah otomatis.
 */
export const members: Member[] = [
  defineMember(1, "Vithorion", "founder"),
  defineMember(2, "Arz super Mega ultra atomic", "founder"),
  defineMember(3, "Faiz Nvxn", "founder"),
  defineMember(4, "Noir", "founder"),
  defineMember(5, "Dede", "founder"),
  defineMember(6, "Varenz", "founder"),
  defineMember(7, "Azeerin Carthilova", "atmin"),
  defineMember(8, "Jerica", "member"),
  defineMember(9, "Kamen rider Kabuto", "member"),
  defineMember(10, "Aryo", "member"),
  defineMember(11, "Anggrey", "member"),
  defineMember(12, "Zeky", "member"),
  defineMember(13, "Lonte Arab", "member"),
  defineMember(14, "Niken", "member"),
  defineMember(15, "Shiryu", "member"),
  defineMember(16, "Daffa", "member"),
].sort((a, b) => a.ano - b.ano);
