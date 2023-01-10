import cors from '@fastify/cors';
import Fastify, { FastifyInstance } from 'fastify';
import delay from './delay';
import users, { User } from './users';

interface ResponseMessage {
  success: boolean;
  error: string | null;
  username?: string;
};

const server: FastifyInstance = Fastify({});
const port = 3000;

server.register(cors);

server.post<{ Body: User, Reply: ResponseMessage }>('/login', async (request, reply) => {
  const { username, password } = request.body;

  if (!users.has(username) || users.get(username) !== password) {
    return reply.send({
      success: false,
      error: 'Wrong username or password'
    });
  }

  return reply.send({
    success: true,
    error: null,
    username
  });
});

server.post<{ Reply: ResponseMessage }>('/logout', async (request, reply) => {
  return reply.send({
    success: true,
    error: null
  });
});

server.addHook('onRequest', async () => {
  await delay();
});

const start = async () => {
  try {
    await server.listen({ port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();