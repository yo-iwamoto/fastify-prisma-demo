import type { User } from '@prisma/client';
import { CustomError } from '../lib/error';
import { prisma } from '../lib/prisma';

export const usersService = {
  findUser: async (id: string): Promise<User> => {
    const userRecord = await prisma.user.findUnique({ where: { id } });

    if (!userRecord) {
      throw new CustomError('not-found', 'no user found with this id');
    }

    return userRecord;
  },
};
