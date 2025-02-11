// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      expressiveCode: {
        themes: ['material-theme', 'github-light'],
      },
      customCss: [
        '@fontsource-variable/plus-jakarta-sans',
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            {
              label: 'Example Guide',
              slug: 'guides/example',
              collapsed: false,
            },
            { label: 'Example Guide 2', slug: 'guides/example-2' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
    react(),
    vue(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
