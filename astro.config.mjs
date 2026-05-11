import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://www.mercuresrl.com",
  output: "static",
  integrations: [react(), icon()],
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: "auto"
  },
  prefetch: {
    prefetchAll: true
  }
});
