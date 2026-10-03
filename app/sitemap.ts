import type { MetadataRoute } from "next";
import { getRecords } from "@/lib/archive";
import { getMembers } from "@/lib/members";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/members`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/archive`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...getMembers().map((m) => ({
      url: `${base}/members/${m.id}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...getRecords().map((r) => ({
      url: `${base}/archive/${r.id}`,
      lastModified: new Date(r.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
