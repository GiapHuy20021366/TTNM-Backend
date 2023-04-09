import express from "express";
import { userTask } from "../controllers/tasks/index";
import { userMiddleware } from "../controllers/middlewares/index";

const router = express.Router();

const initUserRouter = () => {
  // For create new user
  router.post(
    "/api/v1/user",
    userMiddleware.userCheckerForCreate,
    userTask.createNewUser
  );
};

const initWebRouters = (app) => {
  router.get("/", (req, res) => {
    return res.status(200).send("Hello");
  });

  // user router
  initUserRouter();

  return app.use("/", router);
};

module.exports = initWebRouters;
