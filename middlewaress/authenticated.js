import { jwt } from "../utils/index.js";

function asureAuth(req, res, next) {
  console.log("entroooo", req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "La peticion no tiene token" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const hasExpired = jwt.hasExpiredToken(token);
    if (hasExpired) {
      return res.status(400).send({ msg: "El token ha expirado" });
    }

    const payload = jwt.decoded(token);
    req.user = payload;
    
    next();
  } catch (error) {
    return res.status(400).send({ msg: "token invalido" });
  }
}

export const mAuth = {
  asureAuth,
};