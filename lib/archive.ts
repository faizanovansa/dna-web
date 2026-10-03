import { archive } from "@/data/archive";
import { getMemberByAno, getMembers } from "./members";
import type { ArchiveCategory, ArchiveRecord, Member } from "./types";

export type CategoryFilter = "all" | ArchiveCategory;

export const CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "event", label: "EVENT" },
  { key: "document", label: "DOCUMENT" },
  { key: "media", label: "MEDIA" },
  { key: "announcement", label: "ANNOUNCEMENT" },
];

/** "DNA-REC-001" — label tampilan dari id slug. */
export const formatRecordId = (id: string) => id.toUpperCase();

export const getRecords = (): ArchiveRecord[] =>
  [...archive].sort((a, b) => b.date.localeCompare(a.date));

export const getRecordById = (id: string): ArchiveRecord | undefined =>
  archive.find((r) => r.id === id.toLowerCase());

/** Anggota yang terlibat pada sebuah record, urut ANO. Hanya yang tercantum. */
export function getMembersForRecord(record: ArchiveRecord): Member[] {
  return record.relatedMembers
    .map((ano) => getMemberByAno(ano))
    .filter((m): m is Member => Boolean(m))
    .sort((a, b) => a.ano - b.ano);
}

/**
 * Record yang berkaitan dengan seorang anggota.
 * Sumber utama: archive.relatedMembers; relatedRecords manual pada member
 * digabung (tanpa duplikat). Anggota lain tidak otomatis dikaitkan.
 */
export function getRecordsForMember(member: Member): ArchiveRecord[] {
  const manual = new Set((member.relatedRecords ?? []).map((id) => id.toLowerCase()));
  return getRecords().filter(
    (r) => r.relatedMembers.includes(member.ano) || manual.has(r.id),
  );
}

export function searchRecords(
  query: string,
  category: CategoryFilter = "all",
  list: ArchiveRecord[] = getRecords(),
): ArchiveRecord[] {
  const q = query.toLowerCase().trim();
  const names = new Map(getMembers().map((m) => [m.ano, m.displayName.toLowerCase()]));
  return list.filter((r) => {
    if (category !== "all" && r.category !== category) return false;
    if (q === "") return true;
    const text = [
      r.id,
      r.title,
      r.description,
      r.category,
      r.date,
      ...r.relatedMembers.map((a) => names.get(a) ?? ""),
    ]
      .join(" ")
      .toLowerCase();
    return text.includes(q);
  });
}
