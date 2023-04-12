import { userService } from "../../services/core";

const userCheckerForCreate = async (req, res, next) => {
  const user = req.body;
  const requireFields = ["username", "email", "password", "role"];
  for (const field of requireFields) {
    if (!user[field]) {
      return res.status(400).send(`${field} can not empty`);
    }
  }
  const isDuplicated = await userService.isDuplicateUser(user);
  if (isDuplicated) {
    return res.status(400).send("Username or email existed");
  }
  next();
};

const userCheckerForLogin = (req, res, next) => {
  const user = req.body;
  const requireFields = ["email", "password"];
  for (const field of requireFields) {
    if (!user[field]) {
      return res.status(400).send(`${field} can not empty`);
    }
  }
  next();
};

module.exports = {
  userCheckerForCreate,
  userCheckerForLogin,
};
