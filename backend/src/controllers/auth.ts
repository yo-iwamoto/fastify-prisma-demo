import type { FastifyPluginCallback } from 'fastify';
import { CustomError, handleError } from '../lib/error';
import * as jwt from 'jsonwebtoken';
import { usersService } from '../services/user';
import { ACCESS_TOKEN_SECRET, SECRET_KEY } from '../config/env';
import { createHmac } from 'crypto';

export const authController: FastifyPluginCallback = (fastify, _opt, done) => {
  // POST /auth
  fastify.post('/', async (req, rep) => {
    type Body = {
      email: string;
      password: string;
    };
    try {
      const { email, password } = (() => {
        const body = req.body as any;
        if (!(body?.email && body?.password)) {
          throw new CustomError('invalid-request', 'wrong parameter', 400);
        }

        return body as Body;
      })();

      const userRecord = await usersService.findUserByEmail(email);
      const passwordHash = createHmac('sha256', SECRET_KEY).update(`${userRecord.salt}:${password}`).digest('hex');

      if (passwordHash === userRecord.passwordHash) {
        const accessToken = jwt.sign({ uid: userRecord.id }, ACCESS_TOKEN_SECRET, { expiresIn: '10s' });

        rep.send({ accessToken });
      }

      throw new CustomError('invalid-request', 'wrong email or password', 400);
    } catch (err) {
      handleError(err, rep);
    }
  });

  // POST /auth/refresh
  fastify.post('/refresh', async (req, rep) => {
    type Body = {
      accessToken: string;
    };
    const { accessToken } = req.body as Body;

    try {
      const token = jwt.verify(accessToken, SECRET_KEY);
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        rep.status(400).send({ message: 'invalid access token' });
      }
    }
  });

  done();
};
