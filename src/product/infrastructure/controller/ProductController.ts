import { Request, Response } from 'express';
import { prisma } from '../../../db';
import { deleteImageToCloudinary } from '../../../image/adapter/out/cloudinary.adapter';
import ProductService from '../../application/service/ProductService';
import ProductCreationDTO from '../../application/dto/ProductCreationDTO';

export default class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  createProduct = (req: Request<unknown, unknown, ProductCreationDTO>, res: Response) => {
    const { title, description, price, categoryId, storeId, imageUrl } = req.body;

    this.productService
      .createProduct({ title, description, price, categoryId, storeId, imageUrl })
      .then((product) => res.status(201).json(product))
      .catch((e: Error) => {
        switch (e.name) {
          case 'InvalidProductTitleException':
          case 'InvalidProductPriceException':
          case 'InvalidImageUrlException':
          case 'StoreNotExistException':
          case 'CategoryNotExistException': {
            return res.status(400).json({ message: e.message });
          }
          default: {
            return res.status(500).json({ error: e });
          }
        }
      });
  };

  deleteProduct = async (req: Request, res: Response) => {
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

  updateProduct = async (req: Request, res: Response) => {
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

  getProductById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.productService
      .getProductById(Number.parseInt(id))
      .then((productFinded) => res.status(200).json(productFinded))
      .catch((e) => {
        switch (e.name) {
          case 'ProductNotExistException':
            return res.status(404).json({ message: e.message });
          default: {
            return res.status(500).json(e);
          }
        }
      });
  };

  getAllProduct = (req: Request, res: Response) => {
    this.productService
      .getAllProducts()
      .then((products) => res.status(200).json(products))
      .catch((e) => {
        console.log('ErrorController_getAllProductOnStock', e);
        return res.status(500).json(e);
      });
  };

  getAllProductOnStock = (req: Request, res: Response) => {
    this.productService
      .getProductsOnStock()
      .then((products) => res.status(200).json(products))
      .catch((e) => {
        console.log('ErrorController_getAllProductOnStock', e);
        return res.status(500).json(e);
      });
  };
}
