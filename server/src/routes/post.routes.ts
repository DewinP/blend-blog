import { Router } from "express";
import PostController from "../controllers/PostController";
import Authorization from "../middleware/Authorization";
const router = Router();

router.post("/", Authorization, PostController.createPost);
router.put("/:id", Authorization, PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/:id", PostController.singlePost);
router.get("/", PostController.allPosts);

export default router;
