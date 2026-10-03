import type { Metadata } from "next";
import { MemberDirectory } from "@/components/MemberDirectory";
import { PageHeader } from "@/components/PageHeader";
import { ROLES } from "@/lib/roles";
import type { RoleFilter } from "@/lib/members";
import type { Role } from "@/lib/types";

export const metadata: Metadata = {
  title: "Member Directory",
  description: "Daftar anggota D•N•A. Seluruh nama adalah nama samaran (public display name).",
  alternates: { canonical: "/members" },
};

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; q?: string }>;
}) {
  const { role, q } = await searchParams;
  const initialRole: RoleFilter = ROLES.includes(role as Role) ? (role as Role) : "all";

  return (
    <main id="main" className="mx-auto max-w-6xl px-6 pb-28 pt-28 md:px-10 md:pt-40">
      <PageHeader title="MEMBER DIRECTORY" subtitle="D•N•A / PERSONNEL ARCHIVE" />
      <div className="mt-14 md:mt-20">
        <MemberDirectory initialRole={initialRole} initialQuery={q ?? ""} />
      </div>
    </main>
  );
}
