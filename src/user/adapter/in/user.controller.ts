import { Request, Response } from 'express';
import { prisma } from '../../../db';
import validateEmail from '../../../shared/validateEmail';

export const createUserAdmin = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).send('You must enter a valid email address');
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(404).send('User already exists');
    }
  } catch (e) {
    console.error('findUniqueUserError', e);
  }

  try {
    const userCreated = await prisma.user.create({
      data: {
        email,
        name,
        role: 'ADMIN',
        profile: {
          create: { bio: 'Awesome custom biography' },
        },
      },
    });

    return res.status(201).json(userCreated);
  } catch (e) {
    console.log('userCreateError', e);
    return res.status(500).send(e);
  }
};
