import { siteConfig } from "@config/site";
import { absoluteUrl } from "@lib/seo";

type JsonLd = Record<string, unknown>;

type FaqItem = {
  question: string;
  answer: string;
};

function cleanObject<T extends JsonLd>(schema: T): T {
  return Object.fromEntries(
    Object.entries(schema).filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value !== undefined && value !== null && value !== "";
    })
  ) as T;
}

function hasRealValue(value: string): boolean {
  return value.trim().length > 0 && !/a definir|x{4,}/i.test(value);
}

export function organizationSchema(): JsonLd {
  const address = siteConfig.addresses.find((item) => hasRealValue(item.streetAddress));

  return cleanObject({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/images/mercure-logo.svg"),
    email: hasRealValue(siteConfig.email) ? siteConfig.email : undefined,
    telephone: hasRealValue(siteConfig.phone) ? siteConfig.phone : undefined,
    address: address
      ? {
          "@type": "PostalAddress",
          streetAddress: address.streetAddress,
          addressLocality: address.addressLocality,
          addressRegion: address.addressRegion,
          addressCountry: address.addressCountry
        }
      : undefined,
    sameAs: Object.values(siteConfig.socialLinks).filter((link) => hasRealValue(link))
  });
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "es-AR",
    publisher: {
      "@type": "Organization",
      name: siteConfig.companyName,
      url: siteConfig.url
    }
  };
}

export function serviceSchema(options: {
  name?: string;
  description?: string;
  url?: string;
} = {}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name ?? "Logística internacional para importaciones",
    description: options.description ?? siteConfig.description,
    url: absoluteUrl(options.url ?? "/"),
    provider: {
      "@type": "Organization",
      name: siteConfig.companyName,
      url: siteConfig.url
    },
    areaServed: {
      "@type": "Country",
      name: "Argentina"
    },
    serviceType: "Coordinación de logística internacional para importaciones"
  };
}

export function faqPageSchema(items: FaqItem[]): JsonLd | undefined {
  if (items.length === 0) {
    return undefined;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function jsonLdScript(schema: JsonLd | JsonLd[]): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
