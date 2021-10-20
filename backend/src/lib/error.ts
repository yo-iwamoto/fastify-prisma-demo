import { FastifyReply } from 'fastify';

type CustomErrorCode = 'unauthorized' | 'not-found' | 'invalid-request' | 'internal' | 'conflict';

export class CustomError {
  constructor(public code: CustomErrorCode, public message: string, public statusCode: number) {}
}

export const handleError = (err: any, rep: FastifyReply) => {
  if (err instanceof CustomError) {
    rep.status(err.statusCode).send({ message: err.message });
  }

  rep.status(500).send({ message: 'internal server error' });
};
