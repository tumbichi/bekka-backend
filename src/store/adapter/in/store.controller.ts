import { Request, Response } from "express";
import { prisma } from "../../../db";

export const createStore = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send("You must enter a valid user id");
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      if (user.role !== "ADMIN") {
        return res.status(401).send("Unauthoraized");
      }
    } else {
      return res.status(400).send("You must enter a valid user id");
    }
  } catch (e) {
    console.log("findUniqueUserByIdError", e);
  }

  try {
    const store = await prisma.store.create({ data: { userId } });
    return res.status(201).json(store);
  } catch (e) {
    console.log("storeCreateError", e);
    res.status(500).json(e);
  }
};
