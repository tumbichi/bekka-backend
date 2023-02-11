import { Router } from 'express';
import ImageController from '../Image/infrastructure/controller/ImageController';
import ImageService from '../Image/application/service/ImageService';
import ImageDataSource from '../Image/infrastructure/dataSource/ImageDataSource';
import { prisma } from '../db';
import CloudinaryAdapter from '../Image/infrastructure/adapter/CloudinaryAdapter';

const router = Router();

const imageController = new ImageController(
  new ImageService(new ImageDataSource(prisma.image), new CloudinaryAdapter()),
);

router.post('/image/upload', imageController.uploadImage);
router.delete('/images', imageController.deleteImage);

export default router;
