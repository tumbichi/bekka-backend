import { Router } from 'express';
import CategoryController from '../Category/infrastructure/controller/CategoryController';
import CategoryService from '../Category/application/service/CategoryService';
import CategoryDataSource from '../Category/infrastructure/dataSource/CategoryDataSource';
import { prisma } from '../db';

const router = Router();

const categoryController = new CategoryController(new CategoryService(new CategoryDataSource(prisma.category)));

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.delete('/categories/:id', categoryController.deleteCategory);
router.put('/categories', categoryController.updateCategory);

export default router;
