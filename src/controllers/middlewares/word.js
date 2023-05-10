import { wordNoteService } from "../../services/core";
import { Role } from "../../constant";

const wordNoteCheckerForCreate = async (req, res, next) => {
  const { word, note } = req.body;
  if (!word) {
    return res.status(400).json({
      err: "Missing word parameter in request",
      status: 400,
    });
  }
  const auth = req?.middlewareStorage?.authorization;
  if (!auth?._id) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error. Invalid Token cause by login method",
    });
  }
  const userId = req.middlewareStorage.authorization._id;
  const existedWordNote = await wordNoteService.getByUserIdAndWord(
    userId,
    word
  );
  if (existedWordNote) {
    return res.status(200).json({
      data: existedWordNote,
      status: 200,
    });
  }
  next();
};

const wordNoteCheckerForDelete = async (req, res, next) => {
  const auth = req?.middlewareStorage?.authorization;
  if (!auth?.role) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error. Invalid Token cause by login method",
    });
  }
  const role = auth.role;
  const userId = auth._id;
  const wordNoteId = req?.params?.id;
  if (!wordNoteId) {
    return res.status(400).json({
      err: "Missing word note id in request",
      status: 400,
    });
  }

  const wordNote = await wordNoteService.getWordNoteById(wordNoteId);
  if (!wordNote) {
    return res.status(404).json({
      err: `No word note with id ${wordNoteId} found`,
      status: 500,
    });
  }

  if (role !== Role.ADMIN && feedback.user !== userId) {
    return res.status(403).json({
      err: "No permission to delete this feedback. Only admin or own",
    });
  }
  next();
};

module.exports = {
  wordNoteCheckerForCreate,
  wordNoteCheckerForDelete,
};
