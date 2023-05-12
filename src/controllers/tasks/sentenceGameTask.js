import { vntkService } from "../../services/utils";
import { sentenceGameService } from "../../services/core";

const getPosTagging = async (req, res) => {
  const { q: sentence } = req.query;
  if (!sentence) {
    return res.status(500).json({
      err: "Missing sentence in query",
      status: 400,
    });
  }
  const posTags = vntkService.posTagging(sentence);
  return res.status(200).json({
    data: posTags,
    status: 200,
  });
};

const getTokenize = async (req, res) => {
  const { q: sentence } = req.query;
  if (!sentence) {
    return res.status(500).json({
      err: "Missing sentence in query",
      status: 400,
    });
  }
  const tokens = vntkService.tokenize(sentence);
  return res.status(200).json({
    data: tokens,
    status: 200,
  });
};

const newGameSentence = async (req, res) => {
  const { sentence } = req.body;
  if (!sentence) {
    return res.status(400).json({
      err: "Missing sentence in request body",
      status: 400,
    });
  }
  const existedSentence = await sentenceGameService.findBySentence(sentence);
  if (existedSentence) {
    return res.status(200).json({
      data: existedSentence,
      status: 200,
    });
  }
  const newSentence = await sentenceGameService.newSentence(sentence);
  if (!newSentence) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: newSentence,
    status: 200,
  });
};

const deleteGameSentence = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      err: "Missing id in request params",
      status: 400,
    });
  }
  const sentence = await sentenceGameService.deleteById(id);
  if (!sentence) {
    return res.status(404).json({
      err: `No sentence with id ${id} found`,
      status: 404,
    });
  }
  return res.status(200).json({
    data: sentence,
    status: 200,
  });
};

const getAllSentences = async (req, res) => {
  const sentences = await sentenceGameService.getAllSentences();
  if (!sentences) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: sentences,
    status: 200,
  });
};

const getRandomGameSentence = async (req, res) => {
  const sample = await sentenceGameService.getRandomGameSentence();
  if (!sample) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  const data = {
    _id: sample._id,
    sentence: sample.sentence,
    tokenize: vntkService.tokenize(sample.sentence),
  };
  return res.status(200).json({
    data: data,
    status: 200,
  });
};

const saveSortGameResult = async (req, res) => {
  const auth = req?.middlewareStorage?.authorization;
  if (!auth?._id) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error. Invalid Token cause by login method",
    });
  }
  const userId = auth._id;
  const { sentenceId, correct } = req.body;
  if (!sentenceId) {
    return res.status(400).json({
      err: `No sentence id found in request body`,
      status: 400,
    });
  }
  if (!correct) {
    return res.status(400).json({
      err: `No correct result found in request body`,
      status: 400,
    });
  }
  const sentenceDB = await sentenceGameService.findSentenceById(sentenceId);
  if (!sentenceDB) {
    return res.status(404).json({
      err: `No sentence with id ${sentenceId} found`,
      status: 404,
    });
  }
  const gameHistory = await sentenceGameService.saveSortGameResult(
    userId,
    sentenceId,
    correct
  );

  if (!gameHistory) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: gameHistory,
    status: 200,
  });
};

module.exports = {
  getPosTagging,
  newGameSentence,
  deleteGameSentence,
  getAllSentences,
  getTokenize,
  getRandomGameSentence,
  saveSortGameResult,
};
