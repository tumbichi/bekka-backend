import axios from "axios";
import { Request, Response } from "express";
import { prisma } from "../../../db";
import { deleteImageToCloudinary } from "../../../image/adapter/out/cloudinary.adapter";

export const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, categoryId, storeId, imageUrl } = req.body;
  // console.log("req.body", req.body);
  // console.log('req.file', req.file)

  if (!title || title.length < 2) {
    return res.status(400).send("Product not valid");
  }

  if (!price) {
    return res.status(400).send("price not valid");
  }

  if (!categoryId) {
    return res.status(400).send("Category not valid");
  }

  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!existingCategory) {
    return res.status(400).send("Category not valid");
  }

  try {
    const product = await prisma.product.create({
      data: {
        title,
        price,
        description,
        imageUrl,
        categoryId,
        storeId,
      },
    });
    return res.status(201).json(product);
  } catch (e) {
    console.log("ProductCreateError", e);
    res.status(500).json(e);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("req.params", req.params);

  const product = await prisma.product.findUnique({
    where: { id: Number.parseInt(id) },
  });

  if (!product) return res.status(404).send("Product doesn't exists");

  const image = await prisma.image.findUnique({
    where: { secure_url: product.imageUrl },
  });

  if (image) {
    // axios.delete("/images")
    try {
      await deleteImageToCloudinary(image.publicId);
      const imageDeleted = await prisma.image.delete({
        where: { publicId: image.publicId },
      });
      console.log("Image deleted: ", imageDeleted);
    } catch (e) {
      console.error("delete image error", e);
    }
  }

  try {
    const productDeleted = await prisma.product.delete({
      where: { id: product.id },
    });
    console.log("product delected", productDeleted);
    return res.status(200).send(product);
  } catch (e) {
    console.log("product delete error", e);
    return res.status(404).send("Product doesn't exists");
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json(e);
  }
};
