import { Router } from "express";
import { messageController } from "../controller/message.controller";

const router = Router();

router.post('/create', messageController.create);

export default router