import { Request, Response } from 'express';

import UserService from '../../application/service/UserService';

export default class UserController {
  private userService: UserService;

  constructor(service: UserService) {
    this.userService = service;
  }

  createUserAdmin = async (req: Request, res: Response) => {
    const { email, name } = req.body;

    this.userService
      .createUserAdmin({ email, name })
      .then((userCreated) => {
        return res.status(201).json(userCreated);
      })
      .catch((error) => {
        switch (error.name) {
          case 'UserAlreadyExistException':
          case 'InvalidEmailException': {
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
