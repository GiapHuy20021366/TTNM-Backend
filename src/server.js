import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import configMiddlewares from "./route/configMiddlewares";
import http from "http";

require("dotenv").config();

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
