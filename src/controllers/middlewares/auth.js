import { jwtService } from "../../services/utils";
import { Role } from "../../constant";

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

const adminPermissionChecker = (req, res, next) => {
  const auth = req?.middlewareStorage?.authorization;
  if (!auth?.role) {
    return res
      .status(500)
      .json("Internal server error. Invalid Token cause by login method");
  }
  if (auth.role != Role.ADMIN) {
    return res
      .status(403)
      .send(
        "Authentication failed. Not permission. Calling this api need ADMIN permission"
      );
  }
  next();
};

module.exports = {
  jwtTokenParser,
  jwtTokenValidChecker,
  adminPermissionChecker,
};
