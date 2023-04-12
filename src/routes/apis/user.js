import { Method } from "../../constant";
import { userMiddleware } from "../../controllers/middlewares";
import { userTask } from "../../controllers/tasks";

const register = {
  method: Method.POST,
  path: "/api/v1/user/register",
  auth: false,
  middlewares: [userMiddleware.userCheckerForCreate],
  task: userTask.createNewUser,
  description: "Sign up a new user",
};

const getInfor = {
  method: Method.GET,
  path: "/api/v1/user/:id",
  auth: true,
  middlewares: [],
  task: userTask.getInfOfUser,
  description: "Get infor of a user",
};

const login = {
  method: Method.POST,
  path: "/api/v1/user/login",
  auth: false,
  middlewares: [userMiddleware.userCheckerForLogin],
  task: userTask.loginUser,
  description: "Login for user",
};

module.exports = {
  register,
  login,
  getInfor,
};
