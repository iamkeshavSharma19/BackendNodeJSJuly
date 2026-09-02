import { Router } from "express";
import * as requestController from "../controllers/request-controller.js";
import { userAuth } from "../middlewares/auth.js";

const requestRouter = Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  requestController.handleSendConnectionRequest,
);

//?revewing connectionRequest API
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  requestController.handleReviewConnectionRequest,
);

export default requestRouter;
