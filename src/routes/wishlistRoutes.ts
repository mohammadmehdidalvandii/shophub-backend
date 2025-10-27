import { Router } from "express";
import { wishlistController } from "../controller/wishlist.controller";

const router = Router();

router.get('/:id', wishlistController.getByUser);
router.post('/add/:id', wishlistController.create);

export default router