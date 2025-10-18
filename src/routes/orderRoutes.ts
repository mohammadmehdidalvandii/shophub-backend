import { orderController } from "../controller/order.controller";
import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();


router.get('/' , orderController.getOrders);   
router.get('/:id', orderController.getOrderId); 
router.post('/create', authenticateToken,orderController.create);

export default router