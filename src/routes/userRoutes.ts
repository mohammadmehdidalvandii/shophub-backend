import { Router } from "express";
import { userController } from "../controller/users.controller";
import { authenticateToken } from "../middleware/authenticateToken";
import { authorizeAdmin } from "../middleware/authorizeAdmin";

const router = Router();

router.use(authenticateToken, authorizeAdmin);

router.get('/' , userController.getUsers);
router.get('/:id', userController.userById);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router