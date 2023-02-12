import { Router } from 'express';
import { prisma } from '../db';
import ImageController from '../app/Image/infrastructure/controller/ImageController';
import ImageService from '../app/Image/application/service/ImageService';
import ImageDataSource from '../app/Image/infrastructure/dataSource/ImageDataSource';
import CloudinaryAdapter from '../app/Image/infrastructure/adapter/CloudinaryAdapter';

const router = Router();

const imageController = new ImageController(
  new ImageService(new ImageDataSource(prisma.image), new CloudinaryAdapter()),
);

router.post('/image/upload', imageController.uploadImage);
router.delete('/images', imageController.deleteImage);

export default router;
