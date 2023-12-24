import { ChatController } from "../controllers/index.js";
import express from "express";
import { mAuth } from "../middlewaress/authenticated.js";

const api = express.Router();

api.post("/chat", [mAuth.asureAuth], ChatController.create);
api.get("/chat", [mAuth.asureAuth], ChatController.getAll);
api.delete("/chat/:id", [mAuth.asureAuth], ChatController.deleteChat);
api.get("/chat/:id", [mAuth.asureAuth], ChatController.getChat);

export const chatRoutes = api;
