import { ttsService } from "../../services/core";

const streamTTS = (req, res) => {
  // const text = req?.params?.text;
  const text = req?.query?.q;
  if (!text) {
    return res.status(400).json({
      status: 400,
      err: "No text found",
    });
  }
  return ttsService.streamTTS(text).pipe(res);
};

module.exports = {
  streamTTS,
};
