import { bookMiddleware, imageMiddleware } from "../../controllers/middlewares";
import { bookTask } from "../../controllers/tasks";
import { ttsTask } from "../../controllers/tasks";
import { Method } from "../../constant";
import { Role } from "../../constant";

const {
  bookCheckerForCreate,
  authorParser,
  authorCreatorIfNotExist,
  bookGetterForUpdate,
} = bookMiddleware;

const uploadBook = {
  method: Method.POST,
  path: "/api/v1/books",
  auth: true,
  permissions: [Role.ADMIN],
  middlewares: [
    bookCheckerForCreate,
    authorParser,
    authorCreatorIfNotExist,
    imageMiddleware.imagesUpload,
  ],
  task: bookTask.uploadBook,
  description:
    "Upload a book. Each author must contain id or alias or (name and alias). Server will reject author having not found id, but will create new one when not found alias",
};

const getAllBooks = {
  method: Method.GET,
  path: "/api/v1/books",
  auth: false,
  permissions: [Role.ANY],
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

const bookTTS = {
  method: Method.GET,
  path: "/api/v1/books/tts/:text",
  auth: true,
  permissions: [Role.ADMIN, Role.USER],
  middlewares: [],
  task: ttsTask.streamTTS,
  description: "Stream audio for a text of book",
};

const updateBook = {
  method: Method.PUT,
  path: "/api/v1/books/:id",
  auth: true,
  permissions: [Role.ADMIN],
  middlewares: [
    bookGetterForUpdate,
    authorParser,
    authorCreatorIfNotExist,
    imageMiddleware.imagesUpload,
  ],
  task: bookTask.updateBook,
  description:
    "Update a book. Each author must contain id or alias or (name and alias). Server will reject author having not found id, but will create new one when not found alias",
};

const likeOneBook = {
  method: Method.PUT,
  path: "/api/v1/books/:id/like",
  auth: true,
  permissions: [Role.USER],
  middlewares: [bookMiddleware.bookLikeChecker],
  task: bookTask.likeOneBook,
  description: "like one book",
};

const unlikeOneBook = {
  method: Method.PUT,
  path: "/api/v1/books/:id/unlike",
  auth: true,
  permissions: [Role.USER],
  middlewares: [bookMiddleware.bookUnlikeChecker],
  task: bookTask.unlikeOneBook,
  description: "unlike one book",
};

const likesOfBook = {
  method: Method.GET,
  path: "/api/v1/books/:id/like",
  auth: true,
  permissions: [Role.USER],
  middlewares: [bookMiddleware.bookLikeCheckerForGet],
  task: bookTask.getLikesOfBook,
  description: "get users who like a book",
};

const getBookSentences = {
  method: Method.GET,
  path: "/api/v1/books/:id/sentences",
  auth: true,
  permissions: [Role.ADMIN, Role.USER],
  middlewares: [],
  task: bookTask.getSentencesOfBook,
  description: "get sentences of one book",
};

const streamBookSentences = {
  method: Method.GET,
  path: "/api/v1/books/:id/sentences/stream",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: bookTask.getSentencesOfBookByStream,
  description: "stream sentences of one book",
};

module.exports = {
  uploadBook,
  getAllBooks,
  getOneBook,
  removeOneBook,
  bookTTS,
  updateBook,
  likeOneBook,
  unlikeOneBook,
  likesOfBook,
  getBookSentences,
  streamBookSentences,
};
