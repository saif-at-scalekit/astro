import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';
export const starlightConfig = {
  title: 'My Docs',
  customCss: [
    '@fontsource-variable/plus-jakarta-sans',
    './src/styles/custom.css',
  ],
  plugins: [
    // Generate the OpenAPI documentation pages.
    starlightOpenAPI([
      {
        base: 'api',
        label: 'My API',
        schema: 'src/schema/scalekit.swagger.json',
        sidebarMethodBadges: true,
        collapsed: false,
      },
    ]),
  ],
  sidebar: [
    {
      label: 'Guides',
      items: [
        { label: 'Example Guide', slug: 'guides/example', collapsed: false },
        { label: 'Example Guide 2', slug: 'guides/example-2' },
      ],
    },
    {
      label: 'Reference',
      autogenerate: { directory: 'reference' },
    },
    ...openAPISidebarGroups,
  ],
};
