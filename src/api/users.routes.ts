import { Router } from 'express';
import { prisma } from '../db';

import UserController from '../app/User/infrastructure/controller/UserController';
import UserService from '../app/User/application/service/UserService';
import UserDataSource from '../app/User/infrastructure/dataSource/UserDataSource';

const router = Router();

const userController = new UserController(new UserService(new UserDataSource(prisma.user)));

router.post('/users/admin', userController.createUserAdmin);

export default router;
