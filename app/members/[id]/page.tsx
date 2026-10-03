import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/Avatar";
import { EscBack } from "@/components/EscBack";
import { Reveal } from "@/components/Reveal";
import { RoleBadge } from "@/components/RoleBadge";
import { formatDateShort } from "@/lib/format";
import { formatRecordId, getRecordsForMember } from "@/lib/archive";
import { formatAno, getMemberById, getMembers } from "@/lib/members";
import { ROLE_LABEL } from "@/lib/roles";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMembers().map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const member = getMemberById(id);
  if (!member) return {};
  // Hanya data publik (nama samaran, role). Tidak ada informasi pribadi di metadata.
  return {
    title: `${member.displayName} — ${formatAno(member.ano)}`,
    description: `${member.displayName}, ${ROLE_LABEL[member.role]} D•N•A (${formatAno(member.ano)}).`,
    alternates: { canonical: `/members/${member.id}` },
  };
}

const labelClass = "font-mono text-[11px] tracking-[0.3em] text-mute";

export default async function MemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = getMemberById(id);
  if (!member) notFound();

  const all = getMembers();
  const index = all.findIndex((m) => m.ano === member.ano);
  const prev = index > 0 ? all[index - 1] : undefined;
  const next = index < all.length - 1 ? all[index + 1] : undefined;
  const records = getRecordsForMember(member);
  const skills = member.skills?.filter(Boolean) ?? [];

  return (
    <main id="main" className="mx-auto max-w-6xl px-6 pb-28 pt-24 md:px-10 md:pt-36">
      <EscBack href="/members" />

      <Link
        href="/members"
        className="inline-flex min-h-12 items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-mute transition-colors duration-500 hover:text-ink"
      >
        <ArrowLeft size={14} strokeWidth={1.25} aria-hidden />
        MEMBER DIRECTORY
      </Link>

      <div className="mt-10 grid gap-14 md:mt-16 md:grid-cols-12 md:items-center">
        <Reveal className="flex flex-col items-center md:order-last md:col-span-5">
          <Avatar
            variant={member.avatarVariant}
            size={280}
            priority
            alt={`Avatar Incognito ${member.avatarVariant}`}
          />
          <p className="mt-6 font-mono text-[11px] tracking-[0.3em] text-mute">
            [ INCOGNITO {member.avatarVariant.toUpperCase()} ]
          </p>
        </Reveal>

        <div className="md:col-span-7">
          <p className="font-mono text-sm tracking-[0.3em] text-mute">{formatAno(member.ano)}</p>
          <h1 className="mt-4 break-words font-display text-5xl font-light uppercase leading-[1.05] tracking-[0.06em] sm:text-6xl md:text-7xl">
            {member.displayName}
          </h1>
          <RoleBadge role={member.role} className="mt-6 inline-block text-sm" />

          <dl className="mt-10 border-t border-line pt-6">
            <dt className={labelClass}>STATUS</dt>
            <dd className="mt-2 font-mono text-sm tracking-[0.25em]">
              {member.status.toUpperCase()}
            </dd>
          </dl>
        </div>
      </div>

      {/* Field kosong disembunyikan, tidak ada data yang dikarang. */}
      {(member.bio || skills.length > 0 || records.length > 0) && (
        <div className="mt-20 grid gap-14 border-t border-line pt-14 md:mt-28 md:grid-cols-12">
          {member.bio && (
            <section className="md:col-span-7">
              <h2 className={labelClass}>BIOGRAPHY</h2>
              <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink/80">{member.bio}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section className="md:col-span-5">
              <h2 className={labelClass}>SKILLS / INTERESTS</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li key={s} className="border border-line px-3 py-2 text-sm text-ink/80">
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {records.length > 0 && (
            <section className="md:col-span-12">
              <h2 className={labelClass}>RELATED RECORDS</h2>
              <ul className="mt-5 border-t border-line">
                {records.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/archive/${r.id}`}
                      className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-5 transition-colors duration-500 hover:border-ink/40"
                    >
                      <span className="font-mono text-sm tracking-[0.2em] transition-transform duration-500 group-hover:translate-x-1">
                        {formatRecordId(r.id)}
                      </span>
                      <span className="font-mono text-xs tracking-[0.2em] text-mute">
                        {formatDateShort(r.date)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      <nav
        aria-label="Anggota lainnya"
        className="mt-24 grid grid-cols-2 gap-6 border-t border-line pt-8 md:mt-32"
      >
        <div>
          {prev && (
            <Link href={`/members/${prev.id}`} className="group block py-2">
              <span className={labelClass}>← {formatAno(prev.ano)}</span>
              <span className="mt-2 block break-words font-display text-xl font-light uppercase tracking-[0.06em] transition-transform duration-500 group-hover:-translate-x-1">
                {prev.displayName}
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link href={`/members/${next.id}`} className="group block py-2">
              <span className={labelClass}>{formatAno(next.ano)} →</span>
              <span className="mt-2 block break-words font-display text-xl font-light uppercase tracking-[0.06em] transition-transform duration-500 group-hover:translate-x-1">
                {next.displayName}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}
