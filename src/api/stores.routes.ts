import { Router } from 'express';
import { prisma } from '../db';

import StoreController from '../Store/infrastructure/controller/StoreController';
import StoreService from '../Store/application/service/StoreService';
import StoreDataSource from '../Store/infrastructure/dataSource/StoreDataSource';

import UserService from '../User/application/service/UserService';
import UserDataSource from '../User/infrastructure/dataSource/UserDataSource';

const router = Router();

const storeController = new StoreController(
  new StoreService(new StoreDataSource(prisma.store), new UserService(new UserDataSource(prisma.user))),
);

router.post('/stores', storeController.createStore);

export default router;
