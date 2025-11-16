import { Router } from "express";
import { messageController } from "../controller/message.controller";

const router = Router();

router.get('/', messageController.getAll)
router.post('/create', messageController.create);
router.delete('/delete/:id', messageController.delete);

export default router