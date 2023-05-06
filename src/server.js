import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import configMiddlewares from "./routes/configMiddlewares";
import http from "http";
import connectDB from "./config/connectDB";
import initAdmins from "./db/migrates/initAdmins";
import fs from "fs";
import https from "https";
import path from "path";

require("dotenv").config();

connectDB();
initAdmins();

const app = express();
// const server = http.createServer(app);

// config app
configMiddlewares(app);

viewEngine(app);
initWebRouters(app);

const httpServer = http.createServer(app);
httpServer.listen(80, () => {
  console.log("http server listening on port 80");
});

const httpsServer = https.createServer(
  {
    key: fs.readFileSync(path.resolve(__dirname, "./rsa/key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "./rsa/cert.pem")),
  },
  app
);
httpsServer.listen(443, () => {
  console.log("https server listening on port 443");
});

// let port = process.env.PORT || 2002;

// server.listen(port, () => {
//   console.log("Running on the port: " + port);
// });
