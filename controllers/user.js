import { User } from "../models/index.js";

async function getMe(req, res) {
  res.status(200).send("ok");
}
export const UserController = { getMe };
