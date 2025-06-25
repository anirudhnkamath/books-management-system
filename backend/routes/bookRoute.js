import express from "express";
const booksRoute = express.Router();

import * as bookFunctions from "../controllers/bookController.js";
import verifyUser from "../middleware/verifyUser.js";

booksRoute.route("/")
  .get(bookFunctions.getAllBooks)
  .post(verifyUser, bookFunctions.addBook);

booksRoute.route("/:id")
  .get(bookFunctions.getBook)
  .put(verifyUser, bookFunctions.updateBook)
  .delete(verifyUser, bookFunctions.deleteBook);

export default booksRoute;
