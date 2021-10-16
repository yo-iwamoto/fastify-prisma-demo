import type { User } from '@prisma/client';
import { CustomError } from '../lib/error';
import { prisma } from '../lib/prisma';

export const usersService = {
  findUser: async (id: string): Promise<User> => {
    const userRecord = await prisma.user.findUnique({ where: { id } });

    if (!userRecord) {
      throw new CustomError('not-found', 'no user found with this id', 404);
    }

    return userRecord;
  },

  signUp: async ({ email, password }: { email: string; password: string }) => {},

  updateProfile: async ({ id, email: password }: { id: string; email: string; password: string }) => {},
};
