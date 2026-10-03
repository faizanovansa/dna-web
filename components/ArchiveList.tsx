"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterChips, SearchField } from "@/components/ListControls";
import { CATEGORIES, formatRecordId, searchRecords, type CategoryFilter } from "@/lib/archive";
import { formatDateShort } from "@/lib/format";

export function ArchiveList({ totalRecords }: { totalRecords: number }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const results = useMemo(() => searchRecords(query, category), [query, category]);

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <SearchField
            id="archive-search"
            label="Cari arsip"
            placeholder="Cari Record ID, judul, tanggal..."
            value={query}
            onChange={setQuery}
          />
        </div>
        <div className="md:col-span-7">
          <FilterChips
            label="Filter kategori"
            options={CATEGORIES}
            value={category}
            onChange={setCategory}
          />
        </div>
      </div>

      <p aria-live="polite" className="mt-8 font-mono text-[11px] tracking-[0.25em] text-mute">
        <span aria-hidden>
          {String(results.length).padStart(2, "0")} / {String(totalRecords).padStart(2, "0")}
        </span>
        <span className="sr-only">
          Menampilkan {results.length} dari {totalRecords} record
        </span>
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 border-t border-line">
          {results.map((r) => (
            <li key={r.id}>
              <Link
                href={`/archive/${r.id}`}
                className="group grid gap-x-8 gap-y-2 border-b border-line py-6 transition-colors duration-500 hover:border-ink/40 md:grid-cols-[11rem_1fr_auto_8rem] md:items-baseline md:py-7"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-mute">
                  {formatRecordId(r.id)}
                </span>
                <span className="font-display text-2xl font-light transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                  {r.title}
                </span>
                <span className="font-mono text-[11px] tracking-[0.25em] text-mute">
                  {r.category.toUpperCase()} · {String(r.media.length).padStart(2, "0")} MEDIA
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-mute md:text-right">
                  {formatDateShort(r.date)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 border-t border-line py-20 text-center">
          <p className="font-display text-3xl font-light">Tidak ada record ditemukan.</p>
          <p className="mt-3 text-sm text-mute">Coba kata kunci atau kategori lain.</p>
        </div>
      )}
    </div>
  );
}
