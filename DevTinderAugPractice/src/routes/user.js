import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import * as userController from "../controllers/user-controller.js";

const userRouter = Router();

userRouter.get(
  "/user/requests/received",
  userAuth,
  userController.handleGetAllRequests,
);

userRouter.get(
  "/user/connections",
  userAuth,
  userController.handleGetAllConnections,
);

userRouter.get("/feed", userAuth, userController.handleGetUserFeed);

export default userRouter;
