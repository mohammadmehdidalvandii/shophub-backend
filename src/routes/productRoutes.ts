import { Router } from "express";
import { productController } from "../controller/product.controller";
import upload from "../config/multer";
import { authenticateToken } from "../middleware/authenticateToken";
import { authorizeAdmin } from "../middleware/authorizeAdmin";

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getProductID);
router.post('/create',authenticateToken ,authorizeAdmin ,upload.array('images',5), productController.create);
router.patch('/:id',authenticateToken , authorizeAdmin , upload.array('images',5) ,  productController.update);
router.delete('/:id', authenticateToken , authorizeAdmin,productController.delete)

export default router;