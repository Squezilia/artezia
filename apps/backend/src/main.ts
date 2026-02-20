import { Hono } from 'hono';
import core from './routes/core';
import docs from './routes/docs';
import { appendTrailingSlash } from 'hono/trailing-slash';
import { auth } from './lib/auth';
import { cors } from 'hono/cors';

const app = new Hono()
  .use(
    '*',
    cors({
      origin: 'http://localhost:8080',
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    })
  )
  .use(appendTrailingSlash())
  .get('/', (c) => c.json('not implemented', 501))
  .on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw))
  .route('/docs', docs)
  .route('/core', core);

export type AppType = typeof app;

console.log('✨ Application started at port 3000!');

export default {
  port: 3000,
  fetch: app.fetch,
};
