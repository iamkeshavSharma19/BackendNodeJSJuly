import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import * as userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get(
  "/users/requests/received",
  userAuth,
  userController.handleViewPendingRequests,
);

userRouter.get(
  "/users/connections",
  userAuth,
  userController.handleViewUserConnections,
);

userRouter.get("/feed", userAuth, userController.handleUserFeed);

export default userRouter;
