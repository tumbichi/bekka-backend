import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../category/adapter/in/category.controller";

const router = Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.delete("/categories/:id", deleteCategory);
router.put("/categories", updateCategory);

export default router;
