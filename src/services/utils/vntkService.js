const vntk = require("vntk");
const pos_tag = vntk.posTag();
const tokenizer = vntk.wordTokenizer();

const posTagging = (sentence) => {
  const result = pos_tag.tag(sentence);
  return result;
};

const tokenize = (sentence) => {
  const result = tokenizer.tag(sentence);
  return result;
};

module.exports = {
  posTagging,
  tokenize,
};
