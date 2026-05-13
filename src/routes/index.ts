import { Router } from "express";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoute";

const router = Router();

router.use("/product", productRoutes);
router.use("/profile", userRoutes);

export default router;
