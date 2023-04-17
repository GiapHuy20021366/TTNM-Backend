import { Method } from "../../constant";
import { ttsTask } from "../../controllers/tasks";
import { Role } from "../../constant";

const streamTTS = {
  method: Method.GET,
  path: "/api/v1/tts/:text",
  auth: false,
  permissions: [Role.ADMIN, Role.USER],
  middlewares: [],
  task: ttsTask.streamTTS,
  description: "Stream audio for a text",
};

module.exports = {
  streamTTS,
};
