import express, { Router } from "express";
import {
  createUser,
  getAllUsers,
  transferPoints,
} from "../controllers/userController";
import { validate } from "../middleware/validate";
import { transferSchema } from "../validations/transferSchema";

const router: Router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/transfer", validate(transferSchema), transferPoints);

export default router;
