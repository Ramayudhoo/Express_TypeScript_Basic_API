import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";
import { upload } from "../lib/multer";

const router = Router();

router.post("/", authenticate, upload.single("image"), createProduct);
router.get("/", authenticate, authorizeRole(["ADMIN"]), getProducts);
router.get("/:id", authenticate, getProductById);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);
export default router;
