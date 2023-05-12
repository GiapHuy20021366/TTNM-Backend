import { GameSentence, SortGameHistory } from "../../db/models";

const findBySentence = async (sentence) => {
  try {
    const sentenceDB = await GameSentence.findOne({
      sentence: sentence,
    }).exec();
    return sentenceDB;
  } catch (error) {
    return null;
  }
};

const findSentenceById = async (id) => {
  try {
    const sentenceDB = await GameSentence.findById(id).exec();
    return sentenceDB;
  } catch (error) {
    return null;
  }
};

const deleteById = async (id) => {
  try {
    const sentenceDB = await GameSentence.findByIdAndRemove(id).exec();
    return sentenceDB;
  } catch (error) {
    return null;
  }
};

const newSentence = async (sentence) => {
  try {
    const sentenceDB = new GameSentence({ sentence });
    await sentenceDB.save();
    return sentenceDB;
  } catch (error) {
    return null;
  }
};

const getAllSentences = async () => {
  try {
    const sentences = await GameSentence.find().exec();
    return sentences;
  } catch (error) {
    return null;
  }
};

const getRandomGameSentence = async () => {
  try {
    const sampleArr = await GameSentence.aggregate([{ $sample: { size: 1 } }]);
    if (sampleArr && sampleArr.length > 0) {
      return sampleArr[0];
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const saveSortGameResult = async (userId, sentenceId, correct) => {
  try {
    const result = new SortGameHistory({
      user: userId,
      sentence: sentenceId,
      correct: correct,
    });
    await result.save();
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = {
  findBySentence,
  deleteById,
  newSentence,
  getAllSentences,
  getRandomGameSentence,
  findSentenceById,
  saveSortGameResult,
};
