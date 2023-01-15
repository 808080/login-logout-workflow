import cors from '@fastify/cors';
import Fastify, { FastifyInstance } from 'fastify';
import delay from './delay';
import users, { User } from './users';
import dotenv from 'dotenv';

dotenv.config();

interface ResponseMessage {
  success: boolean;
  error: string | null;
  username?: string;
};

const server: FastifyInstance = Fastify({});
const port = +process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

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
    const ip = await server.listen({ port, host });
    console.log(`Listening to ${ip} on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();