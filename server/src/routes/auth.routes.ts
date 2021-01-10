import { Router } from "express";
import AuthController from "../controllers/AuthController";
const router = Router();

// router.get("/verify", AuthController);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

// router.post("/logout", logout);

export default router;
