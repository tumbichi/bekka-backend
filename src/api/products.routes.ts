import { Router } from 'express';

import ProductService from '../Product/application/service/ProductService';
import ProductController from '../Product/infrastructure/controller/ProductController';
import ProductDataSource from '../Product/infrastructure/dataSource/ProductDataSource';

import CategoryService from '../Category/application/service/CategoryService';
import CategoryDataSource from '../Category/infrastructure/dataSource/CategoryDataSource';

import StoreService from '../Store/application/service/StoreService';
import StoreDataSource from '../Store/infrastructure/dataSource/StoreDataSource';
import { prisma } from '../db';
import UserService from '../User/application/service/UserService';
import UserDataSource from '../User/infrastructure/dataSource/UserDataSource';
import ImageService from '../Image/application/service/ImageService';
import ImageDataSource from '../Image/infrastructure/dataSource/ImageDataSource';
import CloudinaryAdapter from '../Image/infrastructure/adapter/CloudinaryAdapter';

const router = Router();

const productController = new ProductController(
  new ProductService(
    new ProductDataSource(),
    new CategoryService(new CategoryDataSource(prisma.category)),
    new StoreService(new StoreDataSource(prisma.store), new UserService(new UserDataSource(prisma.user))),
    new ImageService(new ImageDataSource(prisma.image), new CloudinaryAdapter()),
  ),
);

router.post('/products', productController.createProduct);
router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.updateProduct);
router.get('/products', productController.getAllProduct);
router.get('/productsStock', productController.getAllProductOnStock);
router.get('/products/:id', productController.getProductById);

export default router;
