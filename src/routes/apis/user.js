import { Method } from "../../constant";
import { userMiddleware, imageMiddleware } from "../../controllers/middlewares";
import { userTask } from "../../controllers/tasks";
import { Role } from "../../constant";

const register = {
  method: Method.POST,
  path: "/api/v1/user/register",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [
    userMiddleware.userCheckerForCreate,
    imageMiddleware.avatarUpload,
  ],
  task: userTask.createNewUser,
  description: "Sign up a new user",
};

const getInfor = {
  method: Method.GET,
  path: "/api/v1/user/:id",
  auth: true,
  permissions: [Role.ADMIN, Role.USER],
  middlewares: [],
  task: userTask.getInfOfUser,
  description: "Get infor of a user",
};

const login = {
  method: Method.POST,
  path: "/api/v1/user/login",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [userMiddleware.userCheckerForLogin],
  task: userTask.loginUser,
  description: "Login for user",
};

module.exports = {
  register,
  login,
  getInfor,
};
