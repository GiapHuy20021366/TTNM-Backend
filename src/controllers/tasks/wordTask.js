import { wordOutService } from "../../services/utils";
import { wordNoteService } from "../../services/core";

const getWordDefinition = async (req, res) => {
  const word = req?.query?.q?.trim();
  if (!word) {
    return res.status(400).json({
      err: "Missing query in request",
      status: 400,
    });
  }
  const wordExamples = wordOutService.getExamplesSingleWord(word);
  const wordRoles = wordOutService.crawlWordRoles(word);

  const [examples, roles] = await Promise.all([wordExamples, wordRoles]);
  const data = {
    roles,
    examples,
  };
  return res.status(200).json({
    data: data,
    status: 200,
  });
};

const getWordIllustrations = async (req, res) => {
  const word = req?.query?.q?.trim();
  if (!word) {
    return res.status(400).json({
      err: "Missing query  in request",
      status: 400,
    });
  }
  // const wordImages = await wordOutService.scrapeImages(word);
  // const wordImages = await wordOutService.searchGISImages(word);
  const wordImages = await wordOutService.searchGoogleThisImages(word);
  // const wordImages = await wordOutService.searchImages(word);
  return res.status(200).json({
    data: wordImages,
    status: 200,
  });
};

const createNewWordNote = async (req, res) => {
  const userId = req.middlewareStorage.authorization._id;
  const { word, note } = req.body;
  const wordNote = await wordNoteService.createNewWordNote(userId, word, note);
  if (!wordNote) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: wordNote,
    status: 200,
  });
};

const deleteWordNote = async (req, res) => {
  const wordNoteId = req?.params?.id;

  const wordNote = await wordNoteService.deleteWordNoteById(wordNoteId);
  if (!wordNote) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: wordNote,
    status: 200,
  });
};

const getWordNotesByQuery = async (req, res) => {
  const query = req.query || {};
  const words = await wordNoteService.getWordNotesByQuery(query);
  if (!words) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: words,
    status: 200,
  });
};

const getWordNoteById = async (req, res) => {
  const id = req.params?.id;
  if (!id) {
    return res.status(400).json({
      err: "Missing id in request",
      status: 400,
    });
  }
  const word = await wordNoteService.getWordNoteById(id);
  if (!word) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: word,
    status: 200,
  });
};

module.exports = {
  getWordDefinition,
  getWordIllustrations,
  createNewWordNote,
  deleteWordNote,
  getWordNotesByQuery,
  getWordNoteById,
};
