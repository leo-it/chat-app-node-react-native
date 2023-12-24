import { authRoutes, chatRoutes, userRoutes } from "./routes/index.js";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { initSocketServer } from "./utils/index.js";
import morgan from "morgan";

const app = express();
const server = http.createServer(app);
initSocketServer(server);

//configure body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//configure startic folder
app.use(express.static("uploads"));

//configure  http cors
app.use(cors());

//configure logger
app.use(morgan("dev"));

//configure routing
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", chatRoutes);

export { server };
