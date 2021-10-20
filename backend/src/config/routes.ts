import { FastifyPluginCallback } from 'fastify';
import { authController } from '../controllers/auth';
import { usersController } from '../controllers/user';

export const routes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.register(authController, { prefix: '/auth' });
  fastify.register(usersController, { prefix: '/users' });

  done();
};
