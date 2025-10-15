import { Router } from "express";
import { categoryController } from "../controller/category.controller";

const router = Router();

router.post('/create', categoryController.create);

export default router