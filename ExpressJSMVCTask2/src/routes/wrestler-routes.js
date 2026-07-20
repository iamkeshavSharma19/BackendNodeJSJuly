import { Router } from "express";
import * as wrestlerController from "../controllers/wrestlers-controller.js";

const router = Router();

router.post("/create-wrestler", wrestlerController.handleCreateWrestler);
router.get("/all-wrestlers", wrestlerController.handleGetAllWrestlers);
router.get("/single-wrestler/:id", wrestlerController.handleGetSingleWrestler);
router.delete("/delete-wrestler/:id", wrestlerController.handleDeleteWrestler);
router.delete("/delete-all", wrestlerController.handleDeleteAllWrestlers);
router.patch("/edit-wrestler", wrestlerController.handleEditWrestler);

export default router;
