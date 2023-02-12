import { Request, Response } from 'express';
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
      .catch((error: Error) => {
        switch (error.name) {
          case 'InvalidProductTitleException':
          case 'InvalidProductPriceException':
          case 'InvalidImageUrlException':
          case 'StoreNotExistException':
          case 'CategoryNotExistException': {
            return res.status(400).json({ message: error.message });
          }
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(500).json(jsonResponse);
          }
        }
      });
  };

  deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.productService
      .deleteProduct(Number.parseInt(id))
      .then((deletedProduct) => {
        res.status(200).json(deletedProduct);
      })
      .catch((error) => {
        switch (error.name) {
          case 'ProductNotExistException': {
            return res.status(404).json({ message: error.message });
          }
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(500).json(jsonResponse);
          }
        }
      });
  };

  updateProduct = async (req: Request, res: Response) => {
    const { id, title, description, price, categoryId, storeId, imageUrl } = req.body;

    this.productService
      .editProduct({ title, description, price, categoryId, storeId, imageUrl }, parseInt(id))
      .then((updatedProduct) => {
        return res.status(200).json(updatedProduct);
      })
      .catch((error) => {
        switch (error.name) {
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(500).json(jsonResponse);
          }
        }
      });
  };

  getProductById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.productService
      .getProductById(Number.parseInt(id))
      .then((productFinded) => res.status(200).json(productFinded))
      .catch((error) => {
        switch (error.name) {
          case 'ProductNotExistException':
            return res.status(404).json({ message: error.message });
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(500).json(jsonResponse);
          }
        }
      });
  };

  getAllProduct = (req: Request, res: Response) => {
    this.productService
      .getAllProducts()
      .then((products) => res.status(200).json(products))
      .catch((error) => {
        const jsonResponse = error?.message && typeof error.message === 'string' ? { message: error.message } : error;
        return res.status(500).json(jsonResponse);
      });
  };

  getAllProductOnStock = (req: Request, res: Response) => {
    this.productService
      .getProductsOnStock()
      .then((products) => res.status(200).json(products))
      .catch((error) => {
        const jsonResponse = error?.message && typeof error.message === 'string' ? { message: error.message } : error;
        return res.status(500).json(jsonResponse);
      });
  };
}
