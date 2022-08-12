import { Router } from "express";
import { deleteImage, uploadImage } from "../image/adapter/in/image.controller";

const router = Router();

router.post("/image/upload", uploadImage);
router.delete("/images", deleteImage);

export default router;
