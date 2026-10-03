import { ROLE_LABEL, ROLE_LABEL_PLURAL, ROLE_TEXT_CLASS } from "@/lib/roles";
import type { Role } from "@/lib/types";

/**
 * Role selalu ditulis sebagai teks (FOUNDER / ATMIN / MEMBER),
 * warna hanya penguat, bukan satu-satunya penanda.
 */
export function RoleBadge({
  role,
  plural = false,
  className = "",
}: {
  role: Role;
  plural?: boolean;
  className?: string;
}) {
  return (
    <span className={`font-mono text-xs tracking-[0.28em] ${ROLE_TEXT_CLASS[role]} ${className}`}>
      {plural ? ROLE_LABEL_PLURAL[role] : ROLE_LABEL[role]}
    </span>
  );
}
