import { bookMiddleware } from "../../controllers/middlewares";
import { bookTask } from "../../controllers/tasks";
import { Method } from "../../constant";
import { Role } from "../../constant";

const { bookCheckerForCreate, authorParser, authorCreatorIfNotExist } =
  bookMiddleware;

const uploadBook = {
  method: Method.POST,
  path: "/api/v1/books",
  auth: true,
  permissions: [Role.ADMIN],
  middlewares: [bookCheckerForCreate, authorParser, authorCreatorIfNotExist],
  task: bookTask.uploadBook,
  description:
    "Upload a book. Each author must contain id or alias or (name and alias). Server will reject author having not found id, but will create new one when not found alias",
};

const getAllBooks = {
  method: Method.GET,
  path: "/api/v1/books",
  auth: true,
  permissions: [Role.ADMIN, Role.USER],
  middlewares: [],
  task: bookTask.getAllBooks,
  description: "Get information of books. Not include content!",
};

const getOneBook = {
  method: Method.GET,
  path: "/api/v1/books/:id",
  auth: true,
  permissions: [Role.ADMIN, Role.USER],
  middlewares: [],
  task: bookTask.getOneBook,
  description: "Get all information of one book",
};

const removeOneBook = {
  method: Method.DELETE,
  path: "/api/v1/books/:id",
  auth: true,
  permissions: [Role.ADMIN],
  middlewares: [],
  task: bookTask.removeOneBook,
  description: "Remove a book by id",
};

module.exports = {
  uploadBook,
  getAllBooks,
  getOneBook,
  removeOneBook,
};
