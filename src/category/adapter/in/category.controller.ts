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

export const updateCategory = async (req: Request, res: Response) => {
  const { id, title } = req.body;

  try {
    const updatedProduct = await prisma.category.update({
      data: {
        title,
      },
      where: { id },
    });

    return res.status(200).json(updatedProduct);
  } catch (e) {
    console.log("updated category error", e);
    return res.status(500).json(e);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categoryDeleted = await prisma.category.delete({
      where: { id: Number.parseInt(id) },
    });
    console.log("product delected", categoryDeleted);
    return res.status(200).send(categoryDeleted);
  } catch (e) {
    console.log("product delete error", e);
    return res.status(404).send("Category cannot deleted");
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

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categories = await prisma.category.findUnique({
      where: { id: Number.parseInt(id) },
    });
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(500).json(e);
  }
};
