import { Router } from "express";
import { userController } from "../controller/users.controller";

const router = Router();

router.get('/' , userController.getUsers);
router.get('/:id', userController.userById);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router