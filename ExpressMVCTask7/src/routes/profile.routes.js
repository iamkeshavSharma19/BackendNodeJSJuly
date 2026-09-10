import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import * as profileController from "../controllers/profile.controller.js";

const profileRouter = Router();

profileRouter.get(
  "/profile/view",
  userAuth,
  profileController.handleProfileView,
);

profileRouter.patch(
  "/profile/edit",
  userAuth,
  profileController.handleProfileEdit,
);

export default profileRouter;
