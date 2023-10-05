// Import libraries
import express from 'express';
import { getUsers, getUser, addUser, login} from "../controllers/getUsers.controller.js";
import {validateAuth} from "../domain/crypto.js"

const usersRouter = express.Router();


usersRouter.get("/users",validateAuth, getUsers);
usersRouter.get("/profile/:id", getUser)
usersRouter.post("/register/", addUser)
usersRouter.post("/login/", login)
// usersRouter.put("/:id", updateUser)
// usersRouter.delete("/:id", deleteUser);

export default usersRouter;