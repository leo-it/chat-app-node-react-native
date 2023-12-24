import { ChatMessageController } from "../controllers/index.js";
import express from "express";
import { mAuth } from "../middlewaress/authenticated.js";
import multiparty from "connect-multiparty";

const mdUpload = multiparty({ uploadDir: "./uploads/images" });
const api = express.Router();

api.post("/chat/message", [mAuth.asureAuth], ChatMessageController.sendText);
api.post(
  "/chat/message/image",
  [mAuth.asureAuth, mdUpload],
  ChatMessageController.sendImage
);
api.get(
  "/chat/message/:chat_id",
  [mAuth.asureAuth],
  ChatMessageController.getAll
);
api.get(
  "/chat/message/total/:chat_id",
  [mAuth.asureAuth],
  ChatMessageController.getTotalMessages
);

api.get(
  "/chat/message/last/:chat_id",
  [mAuth.asureAuth],
  ChatMessageController.getLastMessages
);
export const chatMessageRoutes = api;
