import { Router } from 'express';
import { prisma } from '../db';
import StoreController from '../app/Store/infrastructure/controller/StoreController';
import StoreService from '../app/Store/application/service/StoreService';
import StoreDataSource from '../app/Store/infrastructure/dataSource/StoreDataSource';

import UserService from '../app/User/application/service/UserService';
import UserDataSource from '../app/User/infrastructure/dataSource/UserDataSource';

const router = Router();

const storeController = new StoreController(
  new StoreService(new StoreDataSource(prisma.store), new UserService(new UserDataSource(prisma.user))),
);

router.post('/stores', storeController.createStore);

export default router;
