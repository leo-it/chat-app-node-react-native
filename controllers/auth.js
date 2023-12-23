import { User } from "../models/index.js";
import bscrypt from "bcryptjs";
import { jwt } from "../utils/index.js";

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();

    // Utiliza Mongoose para retornar una promesa
    const userStorage = await User.findOne({ email: emailLowerCase });

    if (!userStorage) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    const passwordMatch = await bscrypt.compare(password, userStorage.password);

    if (passwordMatch) {
      res.status(200).send({
        access: jwt.createAccessToken(userStorage),
        refresh: jwt.createRefreshToken(userStorage),
      });
    } else {
      res.status(400).send({ msg: "Contraseña incorrecta" });
    }
  } catch (error) {
    // Manejar errores
    console.error("Error en la función login:", error);
    res.status(500).send({ msg: "Error del servidor", error });
  }
}

async function register(req, res) {
  try {
    const { email, password } = req.body;

    const user = new User({
      email: email.toLowerCase(),
    });
    const salt = bscrypt.genSaltSync(10);
    const hashPassword = bscrypt.hashSync(password, salt);
    user.password = hashPassword;

    const userStorage = await user.save();

    // Enviar respuesta de éxito
    res.status(201).send(userStorage);
  } catch (error) {
    // Manejar errores
    res.status(400).send({ msg: "Error al registrar el usuario", error });
  }
}

async function refreshAccessToken(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).send({ msg: "Token requerido" });

    const hasExpired = jwt.hasExpiredToken(refreshToken);
    if (hasExpired) return res.status(400).send({ msg: "Token expirado" });

    const { user_id } = jwt.decoded(refreshToken);
    const userStorage = await User.findById(user_id).exec();

    if (!userStorage) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    res.status(200).send({
      access: jwt.createAccessToken(userStorage),
    });
  } catch (error) {
    console.log("Error interno del servidor:", error);
    return res.status(500).send({ msg: "Error interno del servidor", error });
  }
}


export const AuthController = { register, login, refreshAccessToken };
