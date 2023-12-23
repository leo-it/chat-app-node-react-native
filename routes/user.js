import { UserController } from "../controllers/index.js";
import express from "express";
import { mAuth } from "../middlewaress/authenticated.js";
import multiparty from "connect-multiparty";

const mdUpload = multiparty({ uploadDir: "./uploads/avatar" });

const api = express.Router();

api.get("/user/me", [mAuth.asureAuth], UserController.getMe);
api.patch("/user/me", [mAuth.asureAuth, mdUpload], UserController.updateUser);
api.get("/user", [mAuth.asureAuth], UserController.getUsers);
api.get("/user/:id", [mAuth.asureAuth], UserController.getUser);

export const userRoutes = api;
