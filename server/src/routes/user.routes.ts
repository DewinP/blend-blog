import UserController from "./../controllers/UserController";
import { Router } from "express";
const router = Router();

export default router;

router.post("/", UserController.newUser);
