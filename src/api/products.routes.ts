import { Router } from 'express';
import { prisma } from '../db';

import ProductService from '../app/Product/application/service/ProductService';
import ProductController from '../app/Product/infrastructure/controller/ProductController';
import ProductDataSource from '../app/Product/infrastructure/dataSource/ProductDataSource';

import CategoryService from '../app/Category/application/service/CategoryService';
import CategoryDataSource from '../app/Category/infrastructure/dataSource/CategoryDataSource';

import StoreService from '../app/Store/application/service/StoreService';
import StoreDataSource from '../app/Store/infrastructure/dataSource/StoreDataSource';
import UserService from '../app/User/application/service/UserService';
import UserDataSource from '../app/User/infrastructure/dataSource/UserDataSource';

import ImageService from '../app/Image/application/service/ImageService';
import ImageDataSource from '../app/Image/infrastructure/dataSource/ImageDataSource';
import CloudinaryAdapter from '../app/Image/infrastructure/adapter/CloudinaryAdapter';

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
