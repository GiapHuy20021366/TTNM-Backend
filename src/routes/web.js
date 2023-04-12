import express from "express";
import { userTask, ttsTask } from "../controllers/tasks";
import { userMiddleware, authMiddleware } from "../controllers/middlewares";
import { Method } from "../constant";

const apis = {
  user: {
    register: {
      method: Method.POST,
      path: "/api/v1/user/register",
      auth: false,
      middlewares: [userMiddleware.userCheckerForCreate],
      task: userTask.createNewUser,
      description: "Sign up a new user",
    },
    getInfor: {
      method: Method.GET,
      path: "/api/v1/user/infor/:id",
      auth: true,
      middlewares: [],
      task: userTask.getInfOfUser,
      description: "Get infor of a user",
    },
    login: {
      method: Method.POST,
      path: "/api/v1/user/login",
      auth: false,
      middlewares: [userMiddleware.userCheckerForLogin],
      task: userTask.loginUser,
      description: "Login for user",
    },
  },
  tts: {
    streamTTS: {
      method: Method.GET,
      path: "/api/v1/tts/:text",
      auth: true,
      middlewares: [],
      task: ttsTask.streamTTS,
      description: "Stream audio for a text",
    },
  },
};

const router = new express.Router();

const initWebRouters = (app) => {
  Object.keys(apis).forEach((componentName) => {
    const component = apis[componentName];
    Object.keys(component).forEach((apiName) => {
      const api = component[apiName];
      const { method, path, auth, middlewares, task } = api;
      if (!middlewares) {
        middlewares = [];
      }

      if (!task) {
        console.warn(
          `ERROR: No task found for executing api ${path} method ${method}. This api  will be reject`
        );
        return;
      }

      if (!router[method]) {
        console.warn(
          `WARNING: Express router has no support for method ${method}. Apis using this method will be reject`
        );
        return;
      }
      // If this API need authorization, add auth middlewares
      if (auth) {
        app.use(path, authMiddleware.jwtTokenValidChecker);
        app.use(path, authMiddleware.jwtTokenParser);
      }
      // App middlewares and task to router
      router[method](path, ...middlewares, task);
    });
  });

  router.get("/api/v1/list", (req, res) => {
    return res
      .status(200)
      .json(
        JSON.parse(
          JSON.stringify(apis, (key, value) =>
            typeof value === "function" ? value.name : value
          )
        )
      );
  });

  router.get("*", function (req, res) {
    res.redirect("/api/v1/list");
  });
  return app.use("/", router);
};

module.exports = initWebRouters;
