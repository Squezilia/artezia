import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import z from 'zod';
import prisma from '@artezia/database';
import { MappedPrismaError, mapPrismaError } from '@artezia/backend/lib/error';
import argon2 from 'argon2';
import { addHours, addSeconds } from 'date-fns';
import { setCookie } from 'hono/cookie';
import { LIMIT_ACTIVE_SESSION, SESSION_COOKIE, SESSION_DURATION } from '../..';
import { randomBytes, hash, createHash } from 'node:crypto';

const LoginBodySchema = z.object({
  username: z.string().min(3).max(32).nonempty().nonoptional(),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/)
    .nonempty()
    .nonoptional(),
});

const RenewBodySchema = z.object({});

const app = new Hono()
  .post(
    '/login',
    zValidator('json', LoginBodySchema, ({ success }, { json }) => {
      if (!success) json('bad request', 400);
    }),
    async (c) => {
      const body = c.req.valid('json');

      // validate user
      const user = await prisma.user
        .findFirst({
          where: {
            name: body.username,
          },
        })
        .catch(mapPrismaError);

      if (user instanceof MappedPrismaError) {
        return c.json(user.response, user.status);
      }

      if (!user) return c.json('user not found', 404);

      if (await argon2.verify(user.password, body.password))
        return c.json("password doesn't match", 401);

      // revoke old session
      await prisma.session.deleteMany({
        where: {
          userId: user.id,
        },
      });

      // create new session
      const sessionKey = randomBytes(32);

      const session = await prisma.session
        .create({
          data: {
            key: createHash('sha256', sessionKey).digest('hex'),
            userId: user.id,
            endedAt: addSeconds(new Date(), SESSION_DURATION),
          },
        })
        .catch(mapPrismaError);

      if (session instanceof MappedPrismaError)
        return c.json(session.response, session.status);

      setCookie(c, SESSION_COOKIE, sessionKey.toString('hex'), {
        expires: session.endedAt,
        httpOnly: true,
        secure: import.meta.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/',
      });

      return c.json(session);
    }
  )
  // TODO: Implement renew endpoint
  .post(
    '/renew',
    zValidator('json', RenewBodySchema),
    ({ status, json, body, req }) => {
      return json('not implemented', 501);
    }
  );

export type AppType = typeof app;
export default app;
