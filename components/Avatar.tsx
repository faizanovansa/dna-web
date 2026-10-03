import Image from "next/image";
import { AVATAR_SRC } from "@/lib/roles";
import type { AvatarVariant } from "@/lib/types";

interface AvatarProps {
  variant: AvatarVariant;
  /** Ukuran sisi dalam px. */
  size?: number;
  /** Kosongkan jika avatar dampingi label teks role (dekoratif). */
  alt?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Satu desain Incognito untuk semua anggota. Hanya warna yang berbeda per role.
 * Dipakai di Directory, Profile, hasil search, preview, dan Structure.
 */
export function Avatar({ variant, size = 96, alt = "", priority = false, className }: AvatarProps) {
  return (
    <Image
      src={AVATAR_SRC[variant]}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      draggable={false}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
