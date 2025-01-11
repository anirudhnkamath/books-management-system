import express from "express";
const booksRoute = express.Router();

import {addBook, getAllBooks, getBook, updateBook, deleteBook} from "../controllers/bookController.js";
import { verifyUser } from "../controllers/userController.js";

booksRoute.post("/", verifyUser, addBook);
booksRoute.get("/", getAllBooks);
booksRoute.get("/:id", getBook);
booksRoute.put("/:id", verifyUser, updateBook);
booksRoute.delete("/:id", verifyUser, deleteBook);

export default booksRoute;
