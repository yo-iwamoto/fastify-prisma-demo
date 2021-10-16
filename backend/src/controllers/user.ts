import type { FastifyPluginCallback } from 'fastify';
import { handleCustomError } from '../lib/error';
import { usersService } from '../services/user';

export const usersController: FastifyPluginCallback = (fastify, _opt, done) => {
  // GET /users/{userId}
  fastify.get('/:userId', async (req, rep) => {
    type RequestParams = { userId: string };
    const { userId } = req.params as RequestParams;

    const user = await usersService.findUser(userId).catch((err) => handleCustomError(err, rep));

    rep.send({ user });
  });

  // POST /users
  fastify.post('/', async (req, rep) => {
    type RequestBody = {
      user: {
        email: string;
        password: string;
      };
    };
    const { user } = req.body as RequestBody;

    const userRecord = await usersService.signUp(user);

    rep.send({ message: 'this API has not been implemented yet' });
  });

  // PATCH /users/{userId}
  fastify.patch('/:userId', async (req, rep) => {
    type RequestParams = { userId: string };
    type RequestBody = {
      user: {
        email: string;
        password: string;
      };
    };
    const { userId } = req.params as RequestParams;
    const { user } = req.body as RequestBody;

    const userRecord = usersService.updateProfile({ id: userId, ...user });

    rep.send({ message: 'this API has not been implemented yet' });
  });

  done();
};
