//General import statements
import { Request, Response } from 'express';
import prisma from '../config/prisma';

// If you have a custom AuthRequest type, use it instead of Request
export const getHabits = async (req: Request, res: Response) => {
  try {
    // Get the userId from the request (set by JWT middleware)
    const userId = (req as any).userId;

    // Fetch all habits for this user from the database
    const habits = await prisma.habit.findMany({
      where: { userId }
    });

    // Send the habits back as JSON
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
};