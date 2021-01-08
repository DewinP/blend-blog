import { Router } from "express";
const router = Router();
import {
  signup,
  login,
  verifySession,
  logout,
} from "../controllers/auth.controller";

router.get("/verify", verifySession);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
