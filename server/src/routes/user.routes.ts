import { Router } from "express";
import UserController from "../controllers/UserController";
import Authorization from "../middleware/Authorization";
const router = Router();

router.get("/posts", Authorization, UserController.userPosts);

export default router;
