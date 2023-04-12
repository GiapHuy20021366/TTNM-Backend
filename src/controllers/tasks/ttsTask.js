import { ttsService } from "../../services/core";

const streamTTS = (req, res) => {
  const text = req?.params?.text;
  if (!text) {
    return res.status(400).send("No text found");
  }
  return ttsService.streamTTS(text).pipe(res);
};

module.exports = {
  streamTTS,
};
