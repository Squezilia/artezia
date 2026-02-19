import { Hono } from 'hono';
import adapters from './adapters';
import ct from './ct';
import vm from './vm';
import rbac from './rbac';

const app = new Hono()
  .route('/adapters', adapters)
  .route('/ct', ct)
  .route('/vm', vm)
  .route('/rbac', rbac);

export type AppType = typeof app;
export default app;
