import authMiddleware from "./auth";

const middlewareStorage = (req, res, next) => {
  req.middlewareStorage = {
    initTime: Date.now(),
  };
  next();
};

module.exports = {
  middlewareStorage,
  authMiddleware,
};
