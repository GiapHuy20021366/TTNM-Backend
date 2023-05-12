import fs from "fs";
import path from "path";
import { sentenceGameService } from "../../services/core";

const initSentences = async () => {
  const sentenceStr = fs.readFileSync(
    path.resolve(__dirname, "../../public/resource/sentences.txt"),
    "utf8"
  );
  const sentences = sentenceStr.split("\r\n");
  let pos = 0;
  for (const sentence of sentences) {
    const existedSentence = await sentenceGameService.findBySentence(sentence);
    if (existedSentence) {
      break;
    }
    await sentenceGameService.newSentence(sentence);
    pos += 1;
  }
  console.log("migrated =>>>>>> ", pos, " sentences");
};

module.exports = initSentences;
