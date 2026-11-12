import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { SITE_URL } from "@/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}/`,
      priority: 0.8,
    })),
  ];
}
