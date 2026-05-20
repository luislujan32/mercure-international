export const siteConfig = {
  name: "Mercure Global",
  brandClaim: "International Logistics Solutions",
  brandClaimEs: "Soluciones logísticas internacionales",
  companyName: "Mercure SRL",
  description:
    "Unidad comercial e integradora de soluciones logísticas internacionales y regionales de Mercure SRL para importaciones, freight forwarding y proyectos de carga desde el NOA.",
  url: import.meta.env.SITE_URL ?? "https://www.mercuresrl.com",
  locale: "es_AR",
  defaultOgImage: "/og-image.jpg",
  logo: "/images/mercure-global-logo.svg",
  whatsappNumber: "",
  phone: "Teléfono a definir",
  email: "Email a definir",
  addresses: [
    {
      label: "Casa central",
      streetAddress: "Dirección a definir",
      addressLocality: "Localidad a definir",
      addressRegion: "Provincia a definir",
      addressCountry: "AR"
    }
  ],
  socialLinks: {
    linkedin: "",
    instagram: "",
    facebook: ""
  },
  mainNavigation: [
    { label: "Servicios", href: "/#servicios" },
    { label: "Proceso", href: "/#proceso" },
    { label: "Rutas", href: "/#rutas" },
    { label: "FAQ", href: "/#preguntas-frecuentes" },
    { label: "Cotizar", href: "/#cotizar" }
  ],
  footerNavigation: [
    { label: "Importar desde China", href: "/importar-desde-china/" },
    { label: "Proyectos logísticos", href: "/proyectos-logisticos/" },
    { label: "Carga aérea internacional", href: "/carga-aerea-internacional/" },
    { label: "Carga marítima internacional", href: "/carga-maritima-internacional/" },
    { label: "Asesoramiento para importar", href: "/asesoramiento-para-importar/" }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
