import express from "express";
import { authMiddleware } from "../controllers/middlewares";
import apis from "./apis";
import { Role, roleLevels } from "../constant";

const initWebRouters = (app) => {
  const router = new express.Router();

  Object.keys(apis).forEach((componentName) => {
    const component = apis[componentName];
    Object.keys(component).forEach((apiName) => {
      const api = component[apiName];
      const { method, path, auth, permissions, middlewares, task } = api;
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
      let authMiddlewares = [];
      if (auth) {
        authMiddlewares.push(
          authMiddleware.jwtTokenValidChecker,
          authMiddleware.jwtTokenParser
        );
      }

      // Apply middlewares corresponding permissions
      if (permissions && permissions.length > 0) {
        const minLevelRole = permissions.reduce((role1, role2) => {
          return roleLevels[role1] < roleLevels[role2] ? role1 : role2;
        });
        if (minLevelRole == Role.ADMIN) {
          authMiddlewares.push(authMiddleware.adminPermissionChecker);
        }
      }
      // App middlewares and task to router
      router[method](path, ...authMiddlewares, ...middlewares, task);
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

  router.get("/api/v1/list/:name", (req, res) => {
    const shortName2FullName = {};
    Object.keys(apis).forEach((apiName) => {
      const shortName = apiName.replace("APIs", "");
      shortName2FullName[shortName] = apiName;
    });
    const name = req?.params?.name;
    if (!name || !shortName2FullName[name]) {
      return res.send([]);
    }
    const fullName = shortName2FullName[name];
    return res
      .status(200)
      .json(
        JSON.parse(
          JSON.stringify(apis[fullName], (key, value) =>
            typeof value === "function" ? value.name : value
          )
        )
      );
  });

  router.get("*", function (req, res) {
    res.status(404).send("404 not found");
  });
  return app.use("/", router);
};

module.exports = initWebRouters;
