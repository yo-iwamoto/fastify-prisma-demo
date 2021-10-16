import { fastify } from 'fastify';

fastify({ logger: true })
  .get('/', async (_req, rep) => {
    rep.send({ message: 'Hello, Fastify!' });
  })
  .listen(3000);
