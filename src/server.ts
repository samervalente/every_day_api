import fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const server = fastify();
server.register(cors);
const prisma = new PrismaClient();

server.get('/', async () => {
  const habits = await prisma.habit.findMany();
  return habits;
});

server
  .listen({
    port: 4000,
  })
  .then(() => console.log('Server Running'));
