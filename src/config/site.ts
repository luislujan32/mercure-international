export const siteConfig = {
  name: "Mercure Internacional",
  companyName: "Mercure SRL",
  description:
    "Unidad de logística internacional de Mercure SRL para empresas, pymes y comercios que necesitan coordinar importaciones hacia Argentina.",
  url: import.meta.env.SITE_URL ?? "https://www.mercuresrl.com",
  locale: "es_AR",
  defaultOgImage: "/og-image.jpg",
  whatsappNumber: "549XXXXXXXXXX",
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
    { label: "Carga aérea internacional", href: "/carga-aerea-internacional/" },
    { label: "Carga marítima internacional", href: "/carga-maritima-internacional/" },
    { label: "Asesoramiento para importar", href: "/asesoramiento-para-importar/" }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
