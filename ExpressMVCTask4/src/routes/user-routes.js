import { Router } from "express";
import * as userController from "../controllers/user-controller.js";

const router = Router();

router.post("/signUp", userController.handleSignUpUser);
router.post("/login", userController.handleUserLogin);
router.get("/get-user/:id", userController.handleGetUser);
router.get("/find-one-user/:id", userController.handleFindOneUser);
router.get("/all-Users", userController.handleGetAllUsers);
router.delete("/delete-user/:id", userController.handleDeleteUser);
router.patch("/edit-user/:id", userController.handleEditUser);

export default router;
