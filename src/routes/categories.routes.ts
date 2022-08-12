import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../category/adapter/in/category.controller";

const router = Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);

export default router;
