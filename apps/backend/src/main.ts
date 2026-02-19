import { Hono } from 'hono';
import auth from './routes/auth';
import core from './routes/core';
import docs from './routes/docs';
import { appendTrailingSlash } from 'hono/trailing-slash';

const app = new Hono()
  .use(appendTrailingSlash())
  .get('/', (c) => c.json('not implemented', 501))
  .route('/docs', docs)
  .route('/auth', auth)
  .route('/core', core);

export type AppType = typeof app;

console.log('✨ Application started at port 3000!');

export default {
  port: 3000,
  fetch: app.fetch,
};
