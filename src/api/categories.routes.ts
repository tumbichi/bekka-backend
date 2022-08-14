import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../category/adapter/in/category.controller";

const router = Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.delete("/categories/:id", deleteCategory);
router.put("/categories", updateCategory);

export default router;
