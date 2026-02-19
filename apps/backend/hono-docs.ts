import { defineConfig } from '@rcmade/hono-docs';

export default defineConfig({
  tsConfigPath: './tsconfig.json',
  openApi: {
    openapi: '3.0.0',
    info: { title: 'Artezia', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000/api' }],
  },
  outputs: {
    openApiJson: './openapi/openapi.json',
  },
  apis: [
    {
      name: 'Auth',
      apiPrefix: '/auth', // This will be prepended to all `api` values below
      appTypePath: 'src/routes/auth/index.ts', // Path to your AppType export
    },
    // {
    //   name: 'Core',
    //   apiPrefix: '/core', // This will be prepended to all `api` values below
    //   appTypePath: 'src/routes/core/index.ts', // Path to your AppType export
    // },
  ],
});
