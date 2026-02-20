import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@artezia/database';
import { apiKey, admin, twoFactor } from 'better-auth/plugins';

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:8080'],
  plugins: [apiKey(), admin(), twoFactor()],
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
