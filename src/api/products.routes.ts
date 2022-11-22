import { Router } from 'express';
import CategoryService from '../category/application/CategoryService';
import CategoryRepository from '../category/infrastructure/CategoryRepository';
import ProductService from '../product/application/ProductService';
import ProductController from '../product/infrastructure/controllers/ProductController';
import ProductRepository from '../product/infrastructure/repositories/ProductRepository';
import StoreService from '../store/application/StoreService';
import StoreRepository from '../store/infrastructure/StoreRepository';

const router = Router();

const productController = new ProductController(
  new ProductService(
    new ProductRepository(),
    new CategoryService(new CategoryRepository()),
    new StoreService(new StoreRepository()),
  ),
);

router.post('/products', productController.createProduct);
router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.updateProduct);
router.get('/products', productController.getAllProduct);
router.get('/productsStock', productController.getAllProductOnStock);
router.get('/products/:id', productController.getProductById);

export default router;
