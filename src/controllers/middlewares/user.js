import { userService } from "../../services/core/index";

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

module.exports = {
  userCheckerForCreate,
};
