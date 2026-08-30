import { Router } from "express";
import * as authController from "../controllers/auth-controller.js";

const authRouter = Router();

authRouter.post("/signup", authController.handleSignUpUser);
authRouter.post("/login", authController.handleLoginUser);
authRouter.post("/logout", authController.handleLoggedOutUser);

export default authRouter;
