import express, { Router } from "express";

import {
  hello,
  getAllUsers,
  getUserById,
  login,
} from "../controllers/userController";

const router: Router = express.Router();

router.get("/hello", hello);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/login", login);

export default router;
