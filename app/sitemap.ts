import type { MetadataRoute } from "next";
import { people } from "@/data/people";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/people", "/films", "/sources"];
  const dynamicPaths = people.map((person) => `/people/${person.slug}`);

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-10-07"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
