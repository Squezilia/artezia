// src/routes/docs.ts
import { Hono } from 'hono';
import { Scalar } from '@scalar/hono-api-reference';
import fs from 'node:fs/promises';
import path from 'node:path';

const docs = new Hono()
  .get(
    '/',
    Scalar({
      url: '/docs/open-api',
      theme: 'deepSpace',
      hideClientButton: true,
      hideDarkModeToggle: true,
      hideModels: true,
      layout: 'modern',
      showSidebar: true,
      showDeveloperTools: 'localhost',
      operationTitleSource: 'summary',
      persistAuth: false,
      telemetry: true,
      isEditable: false,
      isLoading: false,
      documentDownloadType: 'both',
      hideTestRequestButton: false,
      hideSearch: false,
      showOperationId: false,
      withDefaultFonts: true,
      defaultOpenAllTags: false,
      expandAllModelSections: false,
      expandAllResponses: false,
      orderSchemaPropertiesBy: 'alpha',
      orderRequiredPropertiesFirst: true,
      _integration: 'hono',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
      default: false,
      slug: 'artezia',
      title: 'Artezia Developer Documentation',
    })
  )
  .get('/open-api', async (c) => {
    const raw = await fs.readFile(
      path.join(process.cwd(), './apps/backend/openapi/openapi.json'),
      'utf-8'
    );
    return c.json(JSON.parse(raw));
  });

export type AppType = typeof docs;
export default docs;
