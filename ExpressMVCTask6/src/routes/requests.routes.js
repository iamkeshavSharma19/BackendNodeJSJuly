import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import * as requestController from "../controllers/request.controller.js";

const requestRouter = Router();

requestRouter.post(
  "/send/request/:toUserId/:status",
  userAuth,
  requestController.handleSendConnectionRequest,
);

requestRouter.post(
  "/review/request/:status/:requestId",
  userAuth,
  requestController.handleReviewConnectionRequest,
);

export default requestRouter;
