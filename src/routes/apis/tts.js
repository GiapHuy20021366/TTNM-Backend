import { Method } from "../../constant";
import { ttsTask } from "../../controllers/tasks";

const streamTTS = {
  method: Method.GET,
  path: "/api/v1/tts/:text",
  auth: true,
  middlewares: [],
  task: ttsTask.streamTTS,
  description: "Stream audio for a text",
};

module.exports = {
  streamTTS,
};
