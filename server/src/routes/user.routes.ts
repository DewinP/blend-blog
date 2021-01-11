import UserController from "./../controllers/UserController";
import { Router } from "express";
const router = Router();

router.post("/", UserController.newUser);
export default router;
