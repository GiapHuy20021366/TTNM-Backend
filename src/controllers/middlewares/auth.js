import { jwtService } from "../../services/utils/index";

const jwtTokenParser = (req, res, next) => {
  const token = req?.headers?.authorization;
  if (token && req.middlewareStorage) {
    const data = jwtService.verifyToken(token);
    if (data) {
      req.middlewareStorage.authorization = data;
    }
  }
  next();
};

// This middleware will block request and return res if token error
const jwtTokenValidChecker = (req, res, next) => {
  const token = req?.headers?.authorization;
  if (!token) {
    return res.status(403).send("Token not found");
  }
  const data = jwtService.verifyToken(token);
  if (!data) {
    return res.status(403).send("Token invalid");
  }
  next();
};

module.exports = {
  jwtTokenParser,
  jwtTokenValidChecker,
};
