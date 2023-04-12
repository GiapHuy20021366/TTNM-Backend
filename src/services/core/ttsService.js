const gTTS = require("gtts");

const streamTTS = (text, lang = "vi") => {
  return new gTTS(text, lang).stream();
};

module.exports = {
  streamTTS,
};
