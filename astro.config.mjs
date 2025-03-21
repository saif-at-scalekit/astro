// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import path from 'path';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import starlightLinksValidator from 'starlight-links-validator';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightSidebarTopicsDropdown from 'starlight-sidebar-topics-dropdown';
import starlightViewModes from 'starlight-view-modes';
import starlightImageZoom from 'starlight-image-zoom';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import starlightThemeRapide from 'starlight-theme-rapide';
import starlightLlmsTxt from 'starlight-llms-txt';

// https://astro.build/config
export default defineConfig({
  // site: 'https://docs.scalekit.com',
  integrations: [
    starlight({
      title: 'My Docs',
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      favicon: 'src/assets/favicons/logo.png',
      components: {
        SocialIcons: './src/components/overrides/SocialIcons.astro',
      },
      logo: {
        light: '/src/assets/images/scalekit-logo-black.svg',
        dark: '/src/assets/images/scalekit-logo-white.svg',
        replacesTitle: true,
      },
      defaultLocale: 'en',
      editLink: {
        baseUrl:
          'https://github.com/scalekit-inc/scalekit-docs/edit/main/src/content/docs/',
      },
      expressiveCode: {
        // themes: ['material-theme', 'github-light'],
        useStarlightDarkModeSwitch: true,
      },
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/ibm-plex-sans',
        '@fontsource/ibm-plex-mono',
        './src/styles/theme-priority.css',
        // './src/styles/tailwind.css',
        './src/styles/custom.css',
      ],
      plugins: [
        // starlightLinksValidator(), // TODO: Uncomment this when you go live
        // starlightLlmsTxt(), // TODO: Uncomment this when you go live
        // starlightThemeRapide(), // TODO:this is for own design
        starlightImageZoom({
          showCaptions: true,
        }),
        starlightSidebarTopics([
          {
            label: 'Manual',
            id: 'manual',
            link: '/manual/getting-started/',
            icon: 'open-book',
            items: [
              {
                label: 'Quickstarts',
                collapsed: false,
                items: [
                  {
                    label: 'Installation',
                    link: 'manual/getting-started/installation',
                  },
                  'manual/sso-quickstart',
                  'manual/scim-quickstart',
                  'manual/social-logins-quickstart',
                ],
              },
              {
                label: 'Fundamentals',
                items: [
                  {
                    label: 'Admin Portal',
                    link: '/manual/fundamentals/admin-portal',
                  },

                  {
                    label: 'Test SSO Integration',
                    link: '/manual/fundamentals/test-sso-integration',
                  },
                  {
                    label: 'More product guides',
                    link: '/guides/',
                  },
                ],
              },
              {
                label: 'Integrations',
                items: [
                  {
                    label: 'Auth0',
                    link: '/guides/auth-systems/auth0',
                  },
                  {
                    label: 'Cognito',
                    link: '/guides/auth-systems/aws-cognito',
                  },
                  {
                    label: 'Firebase',
                    link: '/guides/auth-systems/firebase',
                  },
                  {
                    label: 'IdP Connectors',
                    link: '/guides/sso-integrations',
                  },
                  {
                    label: 'Directory Connectors',
                    link: '/guides/scim-integrations',
                  },
                ],
              },
              {
                label: 'Support',
                items: [
                  {
                    label: 'Glossary',
                    link: '/manual/support/glossary',
                  },
                  {
                    label: 'Chat with us!',
                    link: '/manual/support/contact-us',
                  },
                  {
                    label: 'Status Page',
                    link: 'https://scalekit.statuspage.io/',
                  },
                ],
              },
            ],
          },
          {
            label: 'Reference',
            id: 'reference',
            link: '/reference/',
            icon: 'starlight',
            items: [
              { label: 'REST APIs', link: '/apis-scalar' },
              {
                label: 'UI Events',
                link: '/reference/ui-events',
              },
              {
                label: 'Errors',
                link: '/reference/errors',
              },
              { label: 'SDKs', autogenerate: { directory: 'reference/sdks' } },
              {
                label: 'Webhooks',
                autogenerate: { directory: 'reference/webhooks' },
              },
            ],
          },
          {
            label: 'Guides',
            link: '/guides/',
            icon: 'puzzle',
            items: [
              {
                label: 'Social Connections',
                autogenerate: { directory: 'guides/social-connections' },
              },
              {
                label: 'SSO Integrations',
                autogenerate: { directory: 'guides/sso-integrations' },
              },
              {
                label: 'SCIM Integrations',
                autogenerate: { directory: 'guides/scim-integrations' },
              },
              {
                label: 'Auth Systems',
                autogenerate: { directory: 'guides/auth-systems' },
              },
              {
                label: 'Product',
                autogenerate: { directory: 'guides/product' },
              },
              {
                label: 'Extended guides',
                autogenerate: { directory: 'guides/extended' },
              },
            ],
          },
        ]),
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    vue({
      jsx: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    }),
  ],
  redirects: {
    '/': {
      destination: '/manual/getting-started',
      status: 301,
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
      },
    },
    optimizeDeps: {
      include: ['vue'],
      exclude: [],
    },
    plugins: [],
  },
});
