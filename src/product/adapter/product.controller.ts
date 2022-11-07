import { Request, Response } from 'express';
import { prisma } from '../../db';
import { deleteImageToCloudinary } from '../../image/adapter/out/cloudinary.adapter';
import ProductAdapter from './product.repository';

interface CreateProductBody {
  title: string;
  description: string;
  price: number;
  categoryId: number;
  storeId: number;
  imageUrl: string;
}

const productAdapter = new ProductAdapter();

export const createProduct = async (req: Request<unknown, unknown, CreateProductBody>, res: Response) => {
  const { title, description, price, categoryId, storeId, imageUrl } = req.body;

  if (!title || title.length < 2) {
    return res.status(400).send('Product not valid');
  }

  if (!price) {
    return res.status(400).send('price not valid');
  }

  if (!categoryId || typeof categoryId !== 'number') {
    return res.status(400).send('Category not valid');
  }

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!existingCategory) {
      return res.status(400).send('Category not valid');
    }
  } catch (e) {
    return res.status(500).json({
      message: 'Error when try know if category exists',
      error: e,
    });
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
    console.error('ProductCreateError', e);
    res.status(500).json(e);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: Number.parseInt(id) },
  });

  if (!product) return res.status(404).send("Product doesn't exists");

  const image = await prisma.image.findUnique({
    where: { secure_url: product.imageUrl },
  });

  if (image) {
    try {
      await deleteImageToCloudinary(image.publicId);
      const imageDeleted = await prisma.image.delete({
        where: { publicId: image.publicId },
      });
      console.log('Image deleted: ', imageDeleted);
    } catch (e) {
      console.error('delete image error', e);
    }
  }

  try {
    const productDeleted = await prisma.product.delete({
      where: { id: product.id },
    });
    console.log('product delected', productDeleted);
    return res.status(200).send(product);
  } catch (e) {
    console.log('product delete error', e);
    return res.status(404).send("Product doesn't exists");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id, title, description, price, categoryId, storeId, imageUrl } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      data: {
        title,
        description,
        price,
        categoryId,
        storeId,
        imageUrl,
      },
      where: { id },
    });

    return res.status(200).json(updatedProduct);
  } catch (e) {
    console.error('updated product error', e);
    return res.status(500).json(e);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productFinded = await prisma.product.findUniqueOrThrow({
      where: { id: Number.parseInt(id) },
    });
    return res.status(200).json(productFinded);
  } catch (e) {
    return res.status(404).json(e);
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

export const getAllProductOnStock = async (req: Request, res: Response) => {
  try {
    const products = await productAdapter.getProductsOnStock();

    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json(e);
  }
};
