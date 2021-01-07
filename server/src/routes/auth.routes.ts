import { Router } from "express";
const router = Router();
import { signup, login, verifySession } from "../controllers/auth.controller";

router.get("/verify", verifySession);
router.post("/signup", signup);
router.post("/login", login);

export default router;
