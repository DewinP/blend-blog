import UserController from "./../controllers/UserController";
import { Router } from "express";
import Authorization from "../middleware/Authorization";
const router = Router();

router.get("/", (_, res) => {
  res.json("r21r12r1r1r");
});
router.get("/:username", UserController.singleUser);
router.post("/isAuth", Authorization, UserController.userAuthenticated);
export default router;
