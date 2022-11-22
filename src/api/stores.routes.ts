import { Router } from 'express';
import { createStore } from '../store/infrastructure/StoreController';

const router = Router();

router.post('/stores', createStore);

export default router;
