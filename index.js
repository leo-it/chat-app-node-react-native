import { DB_HOST, DB_PASSWORD, DB_USER, IP_SERVER, PORT } from "./constants.js";

import { io } from "./utils/socketServer.js";
import mongoose from "mongoose";
import { server } from "./app.js";

const mongoDbRel = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`;

mongoose
  .connect(mongoDbRel, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log("################");
      console.log("### API REST ####");
      console.log("################");
      console.log(`http://${IP_SERVER}:${PORT}/api`);
      io.sockets.on("connection", (socket) => {
        console.log("Nuevo usuario conectado");

        socket.on("disconnect", () => {
          console.log("Usuario desconectado");
        });

        socket.on("subscribe", (room) => {
          socket.join(room);
        });

        socket.on("unsubscribe", (room) => {
          socket.leave(room);
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
