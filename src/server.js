import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import configMiddlewares from "./routes/configMiddlewares";
import http from "http";
import connectDB from "./config/connectDB";

require("dotenv").config();

connectDB();

const app = express();
const server = http.createServer(app);

// config app
configMiddlewares(app);

viewEngine(app);
initWebRouters(app);

// connectDB();

let port = process.env.PORT || 2002;

server.listen(port, () => {
  console.log("Running on the port: " + port);
});
