import { Request, Response } from 'express';
import CategoryService from '../../application/service/CategoryService';

export default class CategoryController {
  private categoryService: CategoryService;

  constructor(service: CategoryService) {
    this.categoryService = service;
  }

  createCategory = (req: Request, res: Response) => {
    const { title } = req.body;

    this.categoryService
      .createCategory({ title })
      .then((categoryCreated) => {
        return res.status(201).json(categoryCreated);
      })
      .catch((error) => {
        switch (error.name) {
          case 'InvalidCategoryTitleException': {
            return res.status(400).json({ message: error.message });
          }
          case 'CategoryAlreadyExistException': {
            return res.status(404).json({ message: error.message });
          }
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(500).json(jsonResponse);
          }
        }
      });
  };

  updateCategory = (req: Request, res: Response) => {
    const { id, title } = req.body;

    this.categoryService
      .updateCategory({ id, title })
      .then((categoryUpdated) => {
        return res.status(200).json(categoryUpdated);
      })
      .catch((error) => {
        switch (error.name) {
          case 'InvalidCategoryTitleException': {
            return res.status(400).json({ message: error.message });
          }
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(500).json(jsonResponse);
          }
        }
      });
  };

  deleteCategory = (req: Request, res: Response) => {
    const { id } = req.params;

    this.categoryService
      .deleteCategory(Number.parseInt(id))
      .then((categoryDeleted) => {
        console.log('product delected', categoryDeleted);
        return res.status(200).send(categoryDeleted);
      })
      .catch((error) => {
        switch (error.name) {
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(404).json(jsonResponse);
          }
        }
      });
  };

  getCategoryById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.categoryService
      .getCategoryById(Number.parseInt(id))
      .then((category) => {
        res.status(200).json(category);
      })
      .catch((error) => {
        switch (error.name) {
          case 'CategoryNotExistException': {
            return res.status(400).json({ message: error.message });
          }
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;

            return res.status(500).json(jsonResponse);
          }
        }
      });
  };

  getAllCategories = (req: Request, res: Response) => {
    this.categoryService
      .getAllCategories()
      .then((categories) => {
        res.status(200).json(categories);
      })
      .catch((error) => {
        switch (error.name) {
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(404).json(jsonResponse);
          }
        }
      });
  };
}
