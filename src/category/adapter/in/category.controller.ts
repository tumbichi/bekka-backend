import { Request, Response } from "express";
import { prisma } from "../../../db";

export const createCategory = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || title.length < 2) {
    return res.status(400).send("Category not valid");
  }

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { title },
    });
    if (existingCategory) {
      return res.status(404).send("Category already exists");
    }
  } catch (e) {
    console.log("error", e);
  }

  try {
    const category = await prisma.category.create({ data: { title } });
    return res.status(201).json(category);
  } catch (e) {
    console.log("categoryCreateError", e);
    res.status(500).json(e);
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(500).json(e);
  }
};
