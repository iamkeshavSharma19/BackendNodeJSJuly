import { Router } from "express";
import * as wrestlerController from "../controllers/wrestler-controller.js";

const router = Router();

router.post("/signUp", wrestlerController.handleAddWrestler);
router.get("/find-wrestler/:id", wrestlerController.handleFindWrestler);
router.get("/findone-wrestler/:id", wrestlerController.handleFindOneWrestler);
router.get("/all-wrestlers", wrestlerController.handleGetAllWrestlers);
router.delete("/delete-wrestler/:id", wrestlerController.handleDeleteWrestlers);
router.patch("/edit-wrestler/:id", wrestlerController.handleEditWrestler);

export default router;
