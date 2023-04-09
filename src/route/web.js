import express from "express";

let router = express.Router();

let initWebRouters = (app) => {
  router.get("/", (req, res) => {
    return res.status(200).send("Hello");
  });

  router.get("/api/auth", (req, res) => {
    return res.send("API");
  });

  return app.use("/", router);
};

module.exports = initWebRouters;
