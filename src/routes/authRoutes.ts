import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { authenticateToken } from "../models/authenticateToken";

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.get('/profile', authenticateToken ,authController.profile)
router.get('/users', authController.getAllUsers)

export default router