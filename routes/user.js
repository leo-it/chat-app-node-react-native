import { UserController } from "../controllers/index.js";
import express from "express";

// import { mAuth } from "../middlewaress/index.js";

const api = express.Router();

api.get("/user/me"/* , [mAuth.asureAuth] */, UserController.getMe);

export const userRoutes = api;
