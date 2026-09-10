import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import * as requestController from "../controllers/request.controller.js";


const requestRouter = Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  requestController.handleSendConnectionRequest,
);

requestRouter.post(
  "/request/received/:status/:requestId",
  userAuth,
  requestController.handleReceiveConnectionRequest,
);

export default requestRouter;
