import { Router } from "express";
import { createPost } from "../controllers/post.controller";
const router = Router();

router.get("/posts", createPost);

export default router;
