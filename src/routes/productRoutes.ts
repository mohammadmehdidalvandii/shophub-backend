import { Router } from "express";
import { productController } from "../controller/product.controller";
import upload from "../config/multer";
const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getProductID);
router.post('/create', upload.array('images',5), productController.create);
router.patch('/:id' , upload.array('images',5) ,  productController.update);

export default router;