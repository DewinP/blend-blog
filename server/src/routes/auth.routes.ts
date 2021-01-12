import { Router } from "express";
import AuthController from "../controllers/AuthController";
import Authorization from "../middleware/Authorization";
const router = Router();

// router.get("/verify", AuthController);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/", Authorization, AuthController.userAuthenticated);

export default router;
