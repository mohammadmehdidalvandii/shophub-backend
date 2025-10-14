import { Router } from "express";
import { userController } from "../controller/users.controller";

const router = Router();

router.get('/' , userController.getUsers);

export default router