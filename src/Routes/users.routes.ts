import { Router } from 'express';
import UserController from '../User/infrastructure/controller/UserController';
import UserService from '../User/application/service/UserService';
import UserDataSource from '../User/infrastructure/dataSource/UserDataSource';
import { prisma } from '../db';

const router = Router();

const userController = new UserController(new UserService(new UserDataSource(prisma.user)));

router.post('/users/admin', userController.createUserAdmin);

export default router;
