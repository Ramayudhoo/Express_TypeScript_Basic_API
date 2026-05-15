import express, { Router } from "express";
import { createUser, getAllUsers } from "../controllers/userController";

const router: Router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);

export default router;
