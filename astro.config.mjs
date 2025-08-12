// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  base: '.',
  site: "https://csvbox.io/blog/",
  integrations: [
    mdx(), 
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    })
  ],
  // Image optimization configuration
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimize for better performance and reduced chain length
      cssCodeSplit: false, // Single CSS file to reduce requests
      rollupOptions: {
        output: {
          // Optimize manual chunks for better caching (Flowbite removed)
          manualChunks: {
            'astro': ['astro/runtime/client/hmr.js'],
          },
          // Optimized asset naming for better caching
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
            const extType = assetInfo.name.split('.').at(1);
            if (extType && /png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (extType && /css/i.test(extType)) {
              return `assets/css/[name]-[hash][extname]`;
            }
            if (extType && /js|mjs/i.test(extType)) {
              return `assets/js/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          // Chunk size optimization
          chunkFileNames: 'assets/js/[name]-[hash].js'
        },
        // External dependencies optimization (Flowbite removed)
        external: (id) => {
          // No external dependencies needed now
          return false;
        }
      }
    },
    ssr: {
      // Improve SSR performance and reduce loading chains
      noExternal: ['web-vitals'],
      // Optimize SSR dependencies
      target: 'node'
    },
    // Optimize dependency pre-bundling (Flowbite removed)
    optimizeDeps: {
      exclude: ['@astrojs/tailwind']
    },
    // Performance optimizations
    server: {
      hmr: {
        overlay: false
      }
    }
  },
  // Performance optimizations
  build: {
    inlineStylesheets: 'always', // Always inline stylesheets for better FCP
    assets: 'assets'
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});
