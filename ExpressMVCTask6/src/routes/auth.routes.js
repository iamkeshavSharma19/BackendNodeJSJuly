import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signUp", authController.handleUserSignUp);

export default authRouter;
