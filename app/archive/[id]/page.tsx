import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/Reveal";
import { RoleBadge } from "@/components/RoleBadge";
import { formatRecordId, getMembersForRecord, getRecordById, getRecords } from "@/lib/archive";
import { formatDateLong } from "@/lib/format";
import { formatAno } from "@/lib/members";

export const dynamicParams = false;

export function generateStaticParams() {
  return getRecords().map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const record = getRecordById(id);
  if (!record) return {};
  return {
    title: `${formatRecordId(record.id)} — ${record.title}`,
    description: `Record arsip D•N•A ${formatRecordId(record.id)}, ${formatDateLong(record.date)}.`,
    alternates: { canonical: `/archive/${record.id}` },
  };
}

const labelClass = "font-mono text-[11px] tracking-[0.3em] text-mute";

export default async function RecordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = getRecordById(id);
  if (!record) notFound();

  const members = getMembersForRecord(record);

  const meta: { label: string; value: string }[] = [
    { label: "DATE", value: formatDateLong(record.date) },
    ...(record.time ? [{ label: "TIME", value: record.time }] : []),
    { label: "CATEGORY", value: record.category.toUpperCase() },
    { label: "STATUS", value: record.status.toUpperCase() },
  ];

  return (
    <main id="main" className="mx-auto max-w-6xl px-6 pb-28 pt-24 md:px-10 md:pt-36">
      <Link
        href="/archive"
        className="inline-flex min-h-12 items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-mute transition-colors duration-500 hover:text-ink"
      >
        <ArrowLeft size={14} strokeWidth={1.25} aria-hidden />
        ARCHIVE
      </Link>

      <header className="mt-10 md:mt-16">
        <p className="font-mono text-sm tracking-[0.3em] text-mute">{formatRecordId(record.id)}</p>
        <h1 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl md:text-8xl">
          {record.title}
        </h1>
      </header>

      <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className={labelClass}>{m.label}</dt>
            <dd className="mt-2 font-mono text-sm tracking-[0.15em]">{m.value}</dd>
          </div>
        ))}
      </dl>

      {record.description && (
        <section className="mt-14 max-w-prose">
          <h2 className={labelClass}>DESCRIPTION</h2>
          <p className="mt-4 text-sm leading-relaxed text-mute">{record.description}</p>
        </section>
      )}

      {record.media.length > 0 && (
        <section className="mt-20">
          <h2 className={`${labelClass} mb-6`}>
            MEDIA — {String(record.media.length).padStart(2, "0")}
          </h2>
          <Reveal>
            <Gallery media={record.media} />
          </Reveal>
        </section>
      )}

      {members.length > 0 && (
        <section className="mt-20">
          <h2 className={labelClass}>RELATED MEMBERS</h2>
          <ul className="mt-5 border-t border-line">
            {members.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/members/${m.id}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-4 transition-colors duration-500 hover:border-ink/40 md:grid-cols-[5rem_auto_1fr_auto] md:gap-8"
                >
                  <span className="hidden font-mono text-xs tracking-[0.2em] text-mute md:block">
                    {formatAno(m.ano)}
                  </span>
                  <Avatar
                    variant={m.avatarVariant}
                    size={40}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] tracking-[0.2em] text-mute md:hidden">
                      {formatAno(m.ano)}
                    </span>
                    <span className="block break-words font-display text-xl font-light uppercase tracking-[0.08em] transition-transform duration-500 group-hover:translate-x-1 md:text-2xl">
                      {m.displayName}
                    </span>
                  </span>
                  <RoleBadge role={m.role} className="text-[10px] md:text-xs" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
