import { Router } from "express";
import { createUserAdmin } from "../user/adapter/in/user.controller";

const router = Router();

router.post("/users/admin", createUserAdmin);

export default router;
