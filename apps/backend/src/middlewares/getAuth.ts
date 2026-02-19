import type { User } from '@artezia/database/generated/prisma/client';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { SESSION_COOKIE } from '..';
import { createHash } from 'node:crypto';
import prisma from '@artezia/database';
import { MappedPrismaError, mapPrismaError } from '../lib/error';

export default createMiddleware<{ Variables: { user?: User } }>(
  async (c, next) => {
    const sessionKey = getCookie(c, SESSION_COOKIE);
    if (!sessionKey) return await next();

    // find session that matches and active
    const session = await prisma.session
      .findFirst({
        where: {
          key: createHash('sha256', Buffer.from(sessionKey)).digest('hex'),
          endedAt: {
            gte: new Date(),
          },
        },
        include: {
          user: true,
        },
      })
      .catch(mapPrismaError);

    if (session instanceof MappedPrismaError)
      return c.json(session.response, session.status);

    if (!session) return await next();

    c.set('user', session.user);
  }
);
