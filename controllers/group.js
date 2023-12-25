import { Group } from "../models/index.js";
import { getFilePath } from "../utils/index.js";

function create(req, res) {
  try {
    const group = new Group(req.body);
    group.creator = req.user.user_id;
    group.participants =
      req.body.participants ? JSON.parse(req.body.participants):"";

    // Verifica si req.files y req.files.image existen antes de acceder a req.files.image
    if (req.files && req.files.image) {
      const imagePath = getFilePath(req.files.image);
      group.image = imagePath;
    }
console.log(req.body);
    res.status(200).send("userData");
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

export const GroupController = {
  create,
};
