import authMiddleware from "./auth";
import userMiddleware from "./user";
import bookMiddleware from "./book";
import authorMiddleware from "./author";
import imageMiddleware from "./image";
import feedbackMiddleware from "./feedback";

const middlewareStorage = (req, res, next) => {
  req.middlewareStorage = {
    initTime: Date.now(),
  };
  next();
};

module.exports = {
  middlewareStorage,
  authMiddleware,
  userMiddleware,
  bookMiddleware,
  authorMiddleware,
  imageMiddleware,
  feedbackMiddleware,
};
