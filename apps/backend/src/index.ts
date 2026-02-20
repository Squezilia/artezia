import app, { type AppType as _AppType } from './main';

export const SESSION_COOKIE = 'session_id';
export const SESSION_DURATION = 6 * 3600; // in seconds
export const LIMIT_ACTIVE_SESSION = 3;

export default app;
export type AppType = _AppType;
