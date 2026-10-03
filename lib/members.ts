import { members } from "@/data/members";
import { ROLES } from "./roles";
import type { Member, Role } from "./types";

export type RoleFilter = "all" | Role;

export const FILTERS: { key: RoleFilter; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "founder", label: "FOUNDERS" },
  { key: "atmin", label: "ATMIN" },
  { key: "member", label: "MEMBERS" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** "ANO 03" — label tampilan. */
export const formatAno = (ano: number) => `ANO ${pad(ano)}`;

export const getMembers = (): Member[] => members;

export const getMemberById = (id: string): Member | undefined =>
  members.find((m) => m.id === id.toLowerCase());

export const getMemberByAno = (ano: number): Member | undefined =>
  members.find((m) => m.ano === ano);

/** Semua angka statistik diturunkan dari registry, tidak ada yang di-hardcode. */
export function getStats(list: Member[] = members) {
  const byRole = Object.fromEntries(
    ROLES.map((r) => [r, list.filter((m) => m.role === r).length]),
  ) as Record<Role, number>;
  return { total: list.length, ...byRole };
}

/** Huruf kecil, pemisah (spasi, -, _, titik, •, ·) diseragamkan jadi satu spasi. */
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\s_\-.•·]+/g, " ")
    .trim();

function haystack(m: Member): string {
  return [
    m.displayName,
    formatAno(m.ano), // "ano 03"
    `ano${pad(m.ano)}`, // "ano03"
    m.id, // "ano-03"
  ]
    .map(normalize)
    .join("|");
}

/**
 * Search realtime + filter role, bisa dipakai bersamaan.
 * Mendukung nama (sebagian), nomor ANO ("ano 11", "ano11", "11"), dan Member ID ("ano-11").
 */
export function searchMembers(
  query: string,
  filter: RoleFilter = "all",
  list: Member[] = members,
): Member[] {
  const q = normalize(query);
  return list.filter((m) => {
    if (filter !== "all" && m.role !== filter) return false;
    return q === "" || haystack(m).includes(q);
  });
}
