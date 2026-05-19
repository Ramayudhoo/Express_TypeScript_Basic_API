import { Router } from "express";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoute";
import authRoutes from "./authRoute";

const router = Router();

router.use("/product", productRoutes);
router.use("/profile", userRoutes);
router.use("/auth", authRoutes);

export default router;
