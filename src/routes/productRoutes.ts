import { Router } from "express";
import { productController } from "../controller/product.controller";
import upload from "../config/multer";
const router = Router();

router.get('/', productController.getAll);
router.post('/create', upload.array('images',5), productController.create);

export default router;