import { siteConfig } from "@config/site";

export type SeoType = "website" | "article";

export type SeoInput = {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  type?: SeoType;
};

export type SeoMeta = Required<Pick<SeoInput, "title" | "description" | "canonical" | "ogTitle" | "ogDescription" | "ogImage" | "type">> &
  Pick<SeoInput, "noindex">;

export function absoluteUrl(pathOrUrl = "/"): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const siteUrl = siteConfig.url.replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

  return `${siteUrl}${path}`;
}

export function buildSeoMeta(input: SeoInput = {}): SeoMeta {
  const title = input.title ?? `${siteConfig.name} | Logística internacional`;
  const description = input.description ?? siteConfig.description;
  const canonical = absoluteUrl(input.canonical ?? "/");
  const ogTitle = input.ogTitle ?? title;
  const ogDescription = input.ogDescription ?? description;
  const ogImage = absoluteUrl(input.ogImage ?? siteConfig.defaultOgImage);
  const type = input.type ?? "website";

  return {
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    noindex: input.noindex,
    type
  };
}
