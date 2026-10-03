"use client";

import { Search, X } from "lucide-react";

export function SearchField({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        size={16}
        strokeWidth={1.25}
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-mute"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        enterKeyHint="search"
        className="w-full border-0 border-b border-line bg-transparent py-4 pl-8 pr-12 text-base text-ink transition-colors duration-300 placeholder:text-mute/70 focus:border-ink/60 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Hapus pencarian"
          className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-mute transition-colors hover:text-ink"
        >
          <X size={16} strokeWidth={1.25} aria-hidden />
        </button>
      )}
    </div>
  );
}

export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.key)}
            className={`min-h-12 shrink-0 border px-5 font-mono text-[11px] tracking-[0.25em] transition-colors duration-300 ${
              active
                ? "border-ink bg-ink text-void"
                : "border-line text-mute hover:border-ink/50 hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
