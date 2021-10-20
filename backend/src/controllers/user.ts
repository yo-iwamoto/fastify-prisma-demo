import type { FastifyPluginCallback } from 'fastify';
import { CustomError, handleError } from '../lib/error';
import { usersService } from '../services/user';

export const usersController: FastifyPluginCallback = (fastify, _opt, done) => {
  // GET /users/{userId}
  fastify.get('/:userId', async (req, rep) => {
    type Params = {
      userId: string;
    };
    try {
      const params = req.params as any;
      if (!params.userId) {
        throw new CustomError('invalid-request', 'insufficient parameters', 400);
      }

      const { userId } = params as Params;

      const user = await usersService.findUserById(userId);

      rep.send({ user });
    } catch (err) {
      handleError(err, rep);
    }
  });

  // POST /users
  fastify.post('/', async (req, rep) => {
    type Body = {
      user: {
        email: string;
        password: string;
      };
    };
    try {
      // const body = JSON.parse(req.body as any);
      // if (!body.user.email || !body.user.password) {
      //   throw new CustomError('invalid-request', 'insufficient parameters', 400);
      // }

      const { user } = req.body as Body;

      const userRecord = await usersService.signUp(user);

      rep.send({ message: 'this API has not been implemented yet' });
    } catch (err) {
      handleError(err, rep);
    }
  });

  // PATCH /users/{userId}
  fastify.patch('/:userId', async (req, rep) => {
    type Params = { userId: string };
    type Body = {
      user: {
        email: string;
        password: string;
      };
    };
    const { userId } = req.params as Params;
    const { user } = req.body as Body;

    const userRecord = usersService.updateProfile({ id: userId, ...user });

    rep.send({ message: 'this API has not been implemented yet' });
  });

  done();
};
