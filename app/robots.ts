import type { MetadataRoute } from "next";

/** Cael is a private app: keep every route out of search indexes. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
