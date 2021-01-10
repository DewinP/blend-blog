import { Router } from "express";
import PostController from "../controllers/PostController";
import Authorization from "../middleware/Authorization";
const router = Router();

router.post("/", Authorization, PostController.createPost);
router.get("/", PostController.allPosts);

export default router;
