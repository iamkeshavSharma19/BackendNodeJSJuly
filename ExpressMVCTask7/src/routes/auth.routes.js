import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", authController.handleUserSignUp);
authRouter.post("/login", authController.handleUserLogin);
authRouter.post("/logout", authController.handleUserLogout);

export default authRouter;
