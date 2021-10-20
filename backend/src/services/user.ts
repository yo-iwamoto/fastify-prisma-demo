import type { User } from '@prisma/client';
import { CustomError } from '../lib/error';
import { prisma } from '../lib/prisma';
import { createHmac, randomBytes } from 'crypto';
import { SECRET_KEY } from '../config/env';

export const usersService = {
  findUserById: async (id: string): Promise<User> => {
    const userRecord = await prisma.user.findFirst({ where: { id } });

    if (!userRecord) {
      throw new CustomError('not-found', 'no user found with this id', 404);
    }

    return userRecord;
  },

  findUserByEmail: async (email: string): Promise<User> => {
    const userRecord = await prisma.user.findFirst({ where: { email } });

    if (!userRecord) {
      throw new CustomError('not-found', 'no user found with this email', 404);
    }

    return userRecord;
  },

  signUp: async ({ email, password }: { email: string; password: string }) => {
    const salt = randomBytes(64).toString('hex');
    const passwordHash = createHmac('sha256', SECRET_KEY).update(`${salt}:${password}`).digest('hex');

    await prisma.user.create({
      data: {
        email,
        salt,
        passwordHash,
      },
    });
  },

  updateProfile: async ({ id, email: password }: { id: string; email: string; password: string }) => {},
};
