import { Router } from "express";
import AuthController from "../controllers/authcontroller";
const router = Router();

// router.get("/verify", AuthController);
router.post("/login", AuthController.login);
// router.post("/logout", logout);

export default router;
