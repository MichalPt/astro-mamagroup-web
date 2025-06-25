import fs from "node:fs";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import { defineConfig, envField } from "astro/config";
import { siteConfig } from "./src/site.config";
import copyFiles from './src/integrations/copy-files.ts';

// Remark plugins
import remarkDirective from "remark-directive";/* handle ::: directives as nodes */
import { remarkAdmonitions } from "./src/plugins/remark-admonitions";/* add admonitions */
import { remarkReadingTime } from "./src/plugins/remark-reading-time";

// Rehype plugins
import rehypeExternalLinks from "rehype-external-links";
import rehypeUnwrapImages from "rehype-unwrap-images";

import react from "@astrojs/react";

import rehypePrettyCode from "rehype-pretty-code";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: netlify(),
  image: {
    domains: ["webmention.io"],
  },
  integrations: [icon(), tailwind({
    applyBaseStyles: false,
    nesting: true,
  }), copyFiles(), sitemap(), mdx(), robotsTxt(), webmanifest({
    // See: https://github.com/alextim/astro-lib/blob/main/packages/astro-webmanifest/README.md
    /**
     * required
     **/
    name: siteConfig.title,
    /**
     * optional
     **/
    // short_name: "Astro_Citrus",
    description: siteConfig.description,
    lang: siteConfig.lang,
    icon: "public/mm-icon.svg", // the source for generating favicon & icons
    icons: [
      {
        src: "icons/apple-touch-icon.png", // used in src/components/BaseHead.astro L:26
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    start_url: "/",
    background_color: "#1d1f21",
    theme_color: "#2bbc8a",
    display: "standalone",
    config: {
      insertFaviconLinks: false,
      insertThemeColorMeta: false,
      insertManifestLink: false,
    },
  }), react()],
  markdown: {
    syntaxHighlight: false,

    remarkPlugins: [remarkReadingTime, remarkDirective, remarkAdmonitions],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [""],
      },
      footnoteBackContent: "⤴",
    },

    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow", "noreferrer"],
          target: "_blank",
        },
      ],

      [
        rehypePrettyCode,
        {
          theme: {
            light: "rose-pine-dawn", // after changing the theme, the server needs to be restarted
            dark: "rose-pine", // after changing the theme, the server needs to be restarted
          },

          transformers: [transformerNotationDiff(), transformerMetaHighlight()],
        },
      ],
      rehypeUnwrapImages,
    ],
  },
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: true,
  // ! Please remember to replace the following site property with your own domain
  // site: "http://mamagroup.netlify.app//",
  site: "https://mama-group.cz//",
  vite: {
    build: {
      sourcemap: true, // Source maps generation
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    plugins: [rawFonts([".ttf", ".woff"])],
  },
  env: {
    schema: {
      // WEBMENTION_API_KEY: envField.string({
      //   context: "server",
      //   access: "secret",
      //   optional: true,
      // }),
      // WEBMENTION_URL: envField.string({
      //   context: "client",
      //   access: "public",
      //   optional: true,
      // }),
      // WEBMENTION_PINGBACK: envField.string({
      //   context: "client",
      //   access: "public",
      //   optional: true,
      // }),
      REBUILD_PASSWORD_HASH: envField.string({
          context: "server",
          access: "secret",
      }),
      NETLIFY_BUILD_HOOK: envField.string({
        context: "server", 
        access: "secret",
      }),
      NETLIFY_ACCESS_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      NETLIFY_SITE_ID: envField.string({
        context: "server",
        access: "public",
      }),
    },
  },
  server: {
    // port: 1234,
    host: true,
  },
  redirects: {
    '/group/mancal/': '/mancal/',
    '/group/maly/': '/maly/',
    },
});

function rawFonts(ext: string[]) {
  return {
    name: "vite-plugin-raw-fonts",
    // @ts-expect-error:next-line
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}