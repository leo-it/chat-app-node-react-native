import { GroupController } from "../controllers/index.js";
import express from "express";
import { mAuth } from "../middlewaress/authenticated.js";
import multiparty from "connect-multiparty";

const mdUpload = multiparty({ uploadDir: "./uploads/group" });

const api = express.Router();
api.post("/group", [mAuth.asureAuth,mdUpload], GroupController.create);

export const groupRoutes = api;
