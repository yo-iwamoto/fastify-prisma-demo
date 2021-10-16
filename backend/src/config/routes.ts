import { FastifyPluginCallback } from 'fastify';
import { usersController } from '../controllers/user';

export const routes: FastifyPluginCallback = (fastly, _opts, done) => {
  fastly.register(usersController, { prefix: '/users' });

  done();
};
