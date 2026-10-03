import { ROLE_VARIANT } from "./roles";
import type { ArchiveRecord, ArchiveVideo, Member, Role } from "./types";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Membuat objek Member dari data minimal.
 * id dan avatarVariant diturunkan otomatis supaya tidak ada avatar
 * yang berbeda-beda untuk tiap anggota.
 */
export function defineMember(
  ano: number,
  displayName: string,
  role: Role,
  extra: Partial<Pick<Member, "bio" | "skills" | "relatedRecords">> = {},
): Member {
  return {
    ano,
    id: `ano-${pad(ano)}`,
    displayName: displayName.trim(),
    role,
    avatarVariant: ROLE_VARIANT[role],
    status: "active",
    ...extra,
  };
}

export function defineRecord(record: ArchiveRecord): ArchiveRecord {
  return record;
}

/** Ambil ID video dari berbagai bentuk URL YouTube. */
export function parseYoutubeId(input: string): string | null {
  const raw = input.trim();
  if (/^[\w-]{11}$/.test(raw)) return raw; // sudah berupa ID
  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\.|^m\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (url.pathname === "/watch") id = url.searchParams.get("v");
      else {
        const m = url.pathname.match(/^\/(?:shorts|embed|live|v)\/([\w-]{11})/);
        id = m ? m[1] : null;
      }
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

/**
 * Membuat media video YouTube dari URL.
 * Contoh: defineVideo("https://youtu.be/dQw4w9WgXcQ", "Judul video")
 */
export function defineVideo(urlOrId: string, title: string): ArchiveVideo {
  const videoId = parseYoutubeId(urlOrId);
  if (!videoId) throw new Error(`URL YouTube tidak valid: ${urlOrId}`);
  return { type: "video", provider: "youtube", videoId, title };
}
