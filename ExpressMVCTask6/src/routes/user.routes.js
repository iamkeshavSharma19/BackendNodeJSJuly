import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get(
  "/user/requests/received",
  userAuth,
  userController.handleViewConnectionRequests,
);

export default userRouter;
