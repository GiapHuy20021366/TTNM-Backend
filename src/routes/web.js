import express from "express";
import { userTask, ttsTask } from "../controllers/tasks";
import { userMiddleware } from "../controllers/middlewares";

const router = express.Router();

const initUserRouter = () => {
  // For create new user
  router.post(
    "/api/v1/user/new",
    userMiddleware.userCheckerForCreate,
    userTask.createNewUser
  );
  // For get info of a user
  router.get("/api/auth/v1/user/:id", userTask.getInfOfUser);
  // For login
  router.post(
    "/api/v1/user",
    userMiddleware.userCheckerForLogin,
    userTask.loginUser
  );
};

const initStreamTTSRouter = () => {
  // text to speech streaming
  router.get("/api/v1/tts/:text", ttsTask.streamTTS);
};

const initWebRouters = (app) => {
  router.get("/", (req, res) => {
    return res.status(200).send("Hello");
  });

  // user router
  initUserRouter();
  initStreamTTSRouter();

  return app.use("/", router);
};

module.exports = initWebRouters;
