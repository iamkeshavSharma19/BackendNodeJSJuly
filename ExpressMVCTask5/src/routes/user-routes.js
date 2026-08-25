import { Router } from "express";
import * as userController from "../controllers/user-controller.js";
import { userAuth } from "../middlewares/auth.js";

const router = Router();

router.post("/signUp", userController.handleUserSignUp);
router.post("/login", userController.handleUserLogin);
router.post(
  "/sendConnectionRequest",
  userAuth,
  userController.handleSendConnectionRequest,
);
router.get("/profile", userAuth, userController.handleGetUserProfile);

export default router;
