import { Router } from "express";
import { categoryController } from "../controller/category.controller";

const router = Router();

router.post('/create', categoryController.create);
router.delete('/:id', categoryController.delete);

export default router