import { fastify } from 'fastify';
import { routes } from './config/routes';

fastify({ logger: true })
  .register(routes)
  .listen(8000, () => {
    console.log('server is listening on port 8000');
  });
