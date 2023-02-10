import { Request, Response } from 'express';
import StoreService from '../../application/service/StoreService';

export default class StoreController {
  private storeService: StoreService;

  constructor(storeService: StoreService) {
    this.storeService = storeService;
  }

  createStore = (req: Request, res: Response) => {
    const { userId } = req.body;

    this.storeService
      .createStore({ userId })
      .then((storeCreated) => {
        return res.status(201).json(storeCreated);
      })
      .catch((error) => {
        switch (error.name) {
          case 'UnauthorizedException': {
            return res.status(401).json({ messages: error.message });
          }
          case 'InvalidUserException': {
            return res.status(400).json({ messages: error.message });
          }
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(500).json(jsonResponse);
          }
        }
      });
  };
}
