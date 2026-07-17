import { Router } from "express";
import * as bookControllers from "../controllers/book-controllers.js";

const router = Router();

router.get("/all-books", bookControllers.handleGetAllBooks);

router.post("/add-book", bookControllers.handleCreateBook);
router.get("/get-book/:id", bookControllers.handleGetSingleBook);
router.patch("/edit-book/:id", bookControllers.handleEditBook);
router.delete("/delete-book/:id", bookControllers.handleDeleteBook);
router.delete("/clear-books", bookControllers.handleDeleteAllBooks);

export default router;
