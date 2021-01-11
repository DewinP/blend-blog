import UserController from "./../controllers/UserController";
import { Router } from "express";
const router = Router();

router.get("/", (_, res) => {
  res.json("r21r12r1r1r");
});
router.get("/:username", UserController.singleUser);
export default router;
