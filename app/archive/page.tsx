import type { Metadata } from "next";
import { ArchiveList } from "@/components/ArchiveList";
import { PageHeader } from "@/components/PageHeader";
import { getRecords } from "@/lib/archive";

export const metadata: Metadata = {
  title: "Archive",
  description: "Arsip dan dokumentasi organisasi D•N•A.",
  alternates: { canonical: "/archive" },
};

export default function ArchivePage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-6 pb-28 pt-28 md:px-10 md:pt-40">
      <PageHeader title="ARCHIVE" subtitle="D•N•A / RECORDS" />
      <div className="mt-14 md:mt-20">
        <ArchiveList totalRecords={getRecords().length} />
      </div>
    </main>
  );
}
