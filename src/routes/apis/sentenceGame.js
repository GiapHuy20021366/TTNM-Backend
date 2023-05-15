import { sentenceGameTask } from "../../controllers/tasks";
import { Method } from "../../constant";
import { Role } from "../../constant";

const posTagging = {
  method: Method.GET,
  path: "/api/v1/games/sentence/pos",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: sentenceGameTask.getPosTagging,
  description: "get pos tags of a sentence",
};

const tokenize = {
  method: Method.GET,
  path: "/api/v1/games/sentence/tokenize",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: sentenceGameTask.getTokenize,
  description: "tokenize a sentence",
};

const newSentence = {
  method: Method.POST,
  path: "/api/v1/games/sentence",
  auth: true,
  permissions: [Role.ANY],
  middlewares: [],
  task: sentenceGameTask.newGameSentence,
  description: "create a new sentence for game",
};

const deleteSentence = {
  method: Method.DELETE,
  path: "/api/v1/games/sentence/:id",
  auth: true,
  permissions: [Role.ANY],
  middlewares: [],
  task: sentenceGameTask.deleteGameSentence,
  description: "delete sentence for game",
};

const allSentences = {
  method: Method.GET,
  path: "/api/v1/games/sentence",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: sentenceGameTask.getAllSentences,
  description: "get all sentences",
};

const randomSentence = {
  method: Method.GET,
  path: "/api/v1/games/sort/random",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: sentenceGameTask.getRandomGameSentence,
  description: "get a random sentence for game sorting",
};

const randomChoices = {
  method: Method.GET,
  path: "/api/v1/games/choice/random",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: sentenceGameTask.getRandomGameChoice,
  description: "get a random sentence and choices",
};

const saveSortGameResult = {
  method: Method.POST,
  path: "/api/v1/games/sort/result",
  auth: true,
  permissions: [Role.USER],
  middlewares: [],
  task: sentenceGameTask.saveSortGameResult,
  description: "save result for sort game sentence",
};

const saveChoiceGameResult = {
  method: Method.POST,
  path: "/api/v1/games/choice/result",
  auth: true,
  permissions: [Role.USER],
  middlewares: [],
  task: sentenceGameTask.saveChoiceGameResult,
  description: "save result for choice game sentence",
};

module.exports = {
  posTagging,
  newSentence,
  deleteSentence,
  allSentences,
  tokenize,
  randomSentence,
  saveSortGameResult,
  saveChoiceGameResult,
  randomChoices,
};
