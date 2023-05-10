import { Method } from "../../constant";
import { wordTask } from "../../controllers/tasks";
import { wordMiddleware } from "../../controllers/middlewares";
import { Role } from "../../constant";

const getDefinition = {
  method: Method.GET,
  path: "/api/v1/words/definition/:word",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: wordTask.getWordDefinition,
  description: "get definition of a word",
};

const getIllustrations = {
  method: Method.GET,
  path: "/api/v1/words/illustration/:word",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: wordTask.getWordIllustrations,
  description: "get illustrations  of a word",
};

const newWordNote = {
  method: Method.POST,
  path: "/api/v1/words",
  auth: true,
  permissions: [Role.USER],
  middlewares: [wordMiddleware.wordNoteCheckerForCreate],
  task: wordTask.createNewWordNote,
  description: "create new word note for user",
};

const deleteWordNote = {
  method: Method.DELETE,
  path: "/api/v1/words/:id",
  auth: true,
  permissions: [Role.USER],
  middlewares: [wordMiddleware.wordNoteCheckerForDelete],
  task: wordTask.deleteWordNote,
  description: "delete word note",
};

const getWordNotesWithQuery = {
  method: Method.GET,
  path: "/api/v1/words",
  auth: true,
  permissions: [Role.USER],
  middlewares: [],
  task: wordTask.getWordNotesByQuery,
  description: "get word notes by query",
};

const getWordNoteById = {
  method: Method.GET,
  path: "/api/v1/words/:id",
  auth: true,
  permissions: [Role.USER],
  middlewares: [],
  task: wordTask.getWordNoteById,
  description: "get word note by id",
};

module.exports = {
  getDefinition,
  getIllustrations,
  newWordNote,
  deleteWordNote,
  getWordNotesWithQuery,
  getWordNoteById,
};
