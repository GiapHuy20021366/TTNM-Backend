import authMiddleware from "./auth";
import userMiddleware from "./user";
import bookMiddleware from "./book";

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
};
