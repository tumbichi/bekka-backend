import { Router } from 'express';
import { createStore } from '../Store/infrastructure/StoreController';

const router = Router();

router.post('/stores', createStore);

export default router;
