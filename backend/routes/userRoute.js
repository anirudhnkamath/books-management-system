import express from "express";
const usersRoute = express.Router();

import * as userFunctions from "../controllers/userController.js";

usersRoute.post("/register", userFunctions.register);
usersRoute.post("/login", userFunctions.login);

export default usersRoute;