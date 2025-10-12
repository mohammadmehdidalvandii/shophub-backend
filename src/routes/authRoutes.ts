import { Router } from "express";
import { authController } from "../controller/auth.controller";

const router = Router();

router.post('/register', authController.register);

export default router