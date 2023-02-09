import { Router } from 'express';

import ProductService from '../Product/application/service/ProductService';
import ProductController from '../Product/infrastructure/controller/ProductController';
import ProductDataSource from '../Product/infrastructure/dataSource/ProductDataSource';

import CategoryService from '../Category/application/service/CategoryService';
import CategoryDataSource from '../Category/infrastructure/dataSource/CategoryDataSource';

import StoreService from '../store/application/StoreService';
import StoreDataSource from '../store/infrastructure/StoreDataSource';
import { prisma } from '../db';

const router = Router();

const productController = new ProductController(
  new ProductService(
    new ProductDataSource(),
    new CategoryService(new CategoryDataSource(prisma.category)),
    new StoreService(new StoreDataSource()),
  ),
);

router.post('/products', productController.createProduct);
router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.updateProduct);
router.get('/products', productController.getAllProduct);
router.get('/productsStock', productController.getAllProductOnStock);
router.get('/products/:id', productController.getProductById);

export default router;
