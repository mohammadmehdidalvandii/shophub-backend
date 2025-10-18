import { orderController } from "../controller/order.controller";
import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();


router.post('/create', authenticateToken,orderController.create);

export default router