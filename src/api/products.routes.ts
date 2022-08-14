import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../product/adapter/in/product.controller";

const router = Router();

router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
router.get("/products", getAllProduct);
router.get("/products/:id", getProductById);

export default router;
