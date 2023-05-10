import { WordNote } from "../../db/models";

const getWordNoteById = async (id) => {
  try {
    const word = await WordNote.findById(id).exec();
    return word;
  } catch (error) {
    return null;
  }
};

const getWordNotesByUser = async (userId) => {
  try {
    const words = await WordNote.find({
      user: userId,
    }).exec();
    return words;
  } catch (error) {
    return null;
  }
};

const createNewWordNote = async (userId, word, note) => {
  try {
    const wordDB = new WordNote({
      user: userId,
      word,
      note,
    });
    console.log(wordDB);
    await wordDB.save();
    return wordDB;
  } catch (error) {
    return null;
  }
};

const deleteWordNoteById = async (id) => {
  try {
    const word = await WordNote.findByIdAndRemove(id).exec();
    return word;
  } catch (error) {
    return null;
  }
};

const getByUserIdAndWord = async (userId, word) => {
  try {
    const wordDB = await WordNote.findOne({
      user: userId,
      word: word,
    }).exec();
    return wordDB;
  } catch (error) {
    return null;
  }
};

const getWordNotesByWord = async (word) => {
  try {
    const words = await WordNote.find({
      word: word,
    }).exec();
    return words;
  } catch (error) {
    return null;
  }
};

const getAllWordNotes = async () => {
  try {
    const words = await WordNote.find().exec();
    return words;
  } catch (error) {
    return error;
  }
};

const getWordNotesByQuery = async (query) => {
  const { user, word } = query;
  if (!user && !word) {
    const words = await getAllWordNotes();
    return words;
  }
  const cond = {};
  if (user) {
    cond.user = user;
  }
  if (word) {
    cond.word = word;
  }
  try {
    const words = await WordNote.find(cond).exec();
    return words;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getWordNoteById,
  getWordNotesByUser,
  createNewWordNote,
  deleteWordNoteById,
  getByUserIdAndWord,
  getWordNotesByWord,
  getWordNotesByQuery,
};
