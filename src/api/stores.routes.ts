import { Router } from "express";
import { createStore } from "../store/adapter/in/store.controller";

const router = Router();

router.post("/stores", createStore);

export default router;
