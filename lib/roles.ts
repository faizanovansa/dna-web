import type { AvatarVariant, Role } from "./types";

export const ROLES: Role[] = ["founder", "atmin", "member"];

/** Satu desain Incognito, hanya warna yang berbeda per role. */
export const ROLE_VARIANT: Record<Role, AvatarVariant> = {
  founder: "gold",
  atmin: "pink",
  member: "white",
};

export const ROLE_LABEL: Record<Role, string> = {
  founder: "FOUNDER",
  atmin: "ATMIN",
  member: "MEMBER",
};

export const ROLE_LABEL_PLURAL: Record<Role, string> = {
  founder: "FOUNDERS",
  atmin: "ATMIN",
  member: "MEMBERS",
};

export const AVATAR_SRC: Record<AvatarVariant, string> = {
  gold: "/brand/avatar-gold.webp",
  pink: "/brand/avatar-pink.webp",
  white: "/brand/avatar-white.webp",
};

/** Kelas warna teks per role (dipakai bersama label teks, bukan warna saja). */
export const ROLE_TEXT_CLASS: Record<Role, string> = {
  founder: "text-gold",
  atmin: "text-rose",
  member: "text-silver",
};
