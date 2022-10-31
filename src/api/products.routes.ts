import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllProductOnStock,
  getProductById,
  updateProduct,
} from "../product/adapter/product.controller";

const router = Router();

router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
router.get("/products", getAllProduct);
router.get("/productsStock", getAllProductOnStock);
router.get("/products/:id", getProductById);

export default router;
