import { FastifyInstance } from 'fastify';
import { prisma } from './lib/prisma';
import { z } from 'zod';

export async function serverRoutes(server: FastifyInstance) {
  server.get('/', async () => {
    const habits = await prisma.habit.findMany();
    return habits;
  });

  server.post('/habits', async (req, res) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(req.body);
    await prisma.habit.create({
      data: {
        title,
        created_at: new Date(),
        habitWeekDays: {
          create: weekDays.map((weekDay) => ({ week_day: weekDay })),
        },
      },
    });
  });
}
