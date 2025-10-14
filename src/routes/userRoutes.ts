import { Router } from "express";
import { userController } from "../controller/users.controller";

const router = Router();

router.get('/' , userController.getUsers);
router.get('/:id', userController.userById);

export default router