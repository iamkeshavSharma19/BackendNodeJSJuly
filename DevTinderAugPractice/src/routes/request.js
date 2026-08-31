import { Router } from "express";
import * as requestController from "../controllers/request-controller.js";
import { userAuth } from "../middlewares/auth.js";

const requestRouter = Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  requestController.handleSendConnectionRequesthandleSendConnectionRequest,
);

export default requestRouter;
