import fastify from 'fastify';
import cors from '@fastify/cors';
import { serverRoutes } from './routes';

const server = fastify();

server.register(cors);
server.register(serverRoutes);

server
  .listen({
    port: 4000,
  })
  .then(() => console.log('Server Running'));
