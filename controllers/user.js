import { User } from "../models/index.js";
import { getFilePath } from "../utils/image.js";

async function getMe(req, res) {
  const { user_id } = req.user;
  try {
    const response = await User.findById(user_id).select(["-password"]);
    if (!response) {
      res.status(400).send({ msg: "No se ha encontrado usuario" });
    } else {
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function getUsers(req, res) {
  const { user_id } = req.user;

  try {
    const users = await User.find({ _id: { $ne: user_id } }).select([
      "-password",
    ]);
    if (!users) {
      res.status(400).send({ msg: "No se han encontrado usuarios" });
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}
async function getUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select(["-password"]);
    if (!user) {
      res.status(400).send({ msg: "No se han encontrado el usuario" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function updateUser(req, res) {
  try {
    const { user_id } = req.user;
    const userData = req.body;

    if (req.files.avatar) {
      const imagePath = getFilePath(req.files.avatar);
      userData.avatar = imagePath;

      await User.findByIdAndUpdate({ _id: user_id }, userData);
      const updatedUser = await User.findById(user_id);

      if (updatedUser) {
        res.status(200).send(userData);
      } else {
        res
          .status(400)
          .send({ msg: "No se pudo encontrar el usuario actualizado" });
      }
    } else {
      res.status(400).send({ msg: "La imagen del avatar no se proporcionó" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}
export const UserController = { getMe, getUsers, getUser, updateUser };
