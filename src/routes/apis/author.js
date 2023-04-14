import {
  authorMiddleware,
  imageMiddleware,
} from "../../controllers/middlewares";
import { authorTask } from "../../controllers/tasks";
import { Method } from "../../constant";
import { Role } from "../../constant";

const createNewAuthor = {
  method: Method.POST,
  path: "/api/v1/authors",
  auth: true,
  permissions: [Role.ADMIN],
  middlewares: [
    authorMiddleware.authorCheckerForCreate,
    imageMiddleware.avatarUpload,
  ],
  task: authorTask.createNewAuthor,
  description: "Create a new author",
};

const getAllAuthors = {
  method: Method.GET,
  path: "/api/v1/authors",
  auth: true,
  permissions: [Role.ADMIN, Role.USER],
  middlewares: [],
  task: authorTask.getAllAuthors,
  description: "Get information of all authors",
};

const getOneAuthor = {
  method: Method.GET,
  path: "/api/v1/authors/:id",
  auth: true,
  permissions: [Role.ADMIN, Role.USER],
  middlewares: [],
  task: authorTask.getOneAuthor,
  description: "Get information of a author",
};

module.exports = {
  createNewAuthor,
  getAllAuthors,
  getOneAuthor,
};
