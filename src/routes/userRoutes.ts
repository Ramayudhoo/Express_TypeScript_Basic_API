import express, { Router } from "express";
import { hello, profile, login } from "../controllers/userController";

const router: Router = express.Router();

router.get("/hello", hello);
router.get("/profile/:name", profile);

router.post("/login", login);

export default router;
