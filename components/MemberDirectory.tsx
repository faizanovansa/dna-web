"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "@/components/Avatar";
import { FilterChips, SearchField } from "@/components/ListControls";
import { RoleBadge } from "@/components/RoleBadge";
import { FILTERS, formatAno, getMembers, searchMembers, type RoleFilter } from "@/lib/members";

export function MemberDirectory({
  initialRole,
  initialQuery,
}: {
  initialRole: RoleFilter;
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [role, setRole] = useState<RoleFilter>(initialRole);

  const total = getMembers().length;
  const results = useMemo(() => searchMembers(query, role), [query, role]);

  // Sinkronkan URL tanpa reload (link ke /members?role=founder bisa dibagikan).
  useEffect(() => {
    const params = new URLSearchParams();
    if (role !== "all") params.set("role", role);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [role, query]);

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <SearchField
            id="member-search"
            label="Cari anggota"
            placeholder="Cari nama, Ano Number..."
            value={query}
            onChange={setQuery}
          />
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <FilterChips label="Filter role" options={FILTERS} value={role} onChange={setRole} />
        </div>
      </div>

      <p
        aria-live="polite"
        className="mt-8 font-mono text-[11px] tracking-[0.25em] text-mute"
      >
        <span aria-hidden>
          {String(results.length).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="sr-only">
          Menampilkan {results.length} dari {total} anggota
        </span>
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 border-t border-line">
          {results.map((m) => (
            <li key={m.id}>
              <Link
                href={`/members/${m.id}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-4 transition-colors duration-500 hover:border-ink/40 md:grid-cols-[5rem_auto_1fr_auto] md:gap-8 md:py-5"
              >
                <span className="hidden font-mono text-xs tracking-[0.2em] text-mute md:block">
                  {formatAno(m.ano)}
                </span>
                <Avatar
                  variant={m.avatarVariant}
                  size={44}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] tracking-[0.2em] text-mute md:hidden">
                    {formatAno(m.ano)}
                  </span>
                  <span className="block break-words font-display text-2xl font-light uppercase tracking-[0.08em] transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                    {m.displayName}
                  </span>
                </span>
                <RoleBadge role={m.role} className="text-[10px] md:text-xs" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 border-t border-line py-20 text-center">
          <p className="font-display text-3xl font-light">Tidak ada anggota ditemukan.</p>
          <p className="mt-3 text-sm text-mute">Coba nama atau Ano Number lain.</p>
        </div>
      )}
    </div>
  );
}
