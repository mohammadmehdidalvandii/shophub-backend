import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { authenticateToken } from "../middleware/authenticateToken";
import { validationLogin, validationRegister } from "../validation/Validation.user";

const router = Router();

router.delete('/delete-account', authenticateToken , authController.deleteAccount);
router.put('/change-password',authenticateToken , authController.changePassword);
router.post('/register', validationRegister ,authController.register);
router.post('/login', validationLogin ,authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/profile', authenticateToken ,authController.profile);


export default router