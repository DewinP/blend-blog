import { Router } from "express";
import { createPost } from "../controllers/PostController";
import passport from "passport";
const router = Router();

router.post("/", passport.authenticate("jwt"), createPost);

export default router;
