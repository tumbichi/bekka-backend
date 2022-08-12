import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
} from "../product/adapter/in/product.controller";

const router = Router();

router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products", getAllProduct);

export default router;
