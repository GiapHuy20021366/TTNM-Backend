import { Role } from "../../constant";
import { userService } from "../../services/core";

const userCheckerForCreate = async (req, res, next) => {
  const user = req.body;
  const requireFields = ["username", "email", "password", "role"];
  for (const field of requireFields) {
    if (!user[field]) {
      return res.status(400).json({
        status: 400,
        err: `${field} can not empty`,
      });
    }
  }
  const isDuplicated = await userService.isDuplicateUser(user);
  if (isDuplicated) {
    return res.status(409).json({
      status: 409,
      err: "Username or email existed",
    });
  }
  next();
};

const userCheckerForLogin = (req, res, next) => {
  const user = req.body;
  const requireFields = ["email", "password"];
  for (const field of requireFields) {
    if (!user[field]) {
      return res.status(400).json({
        status: 400,
        err: `${field} can not empty`,
      });
    }
  }
  next();
};

const userCheckerForUpdate = async (req, res, next) => {
  const auth = req.middlewareStorage.authorization;
  const { id } = req.params;
  const user = req.body;
  if (!id) {
    return res.status(400).json({
      status: 400,
      err: "Missing id in request",
    });
  }
  if (!user) {
    return res.status(400).json({
      status: 400,
      err: "Missing parameters",
    });
  }
  const userDB = await userService.findUserById(id);
  if (!userDB) {
    return res.status(404).json({
      status: 404,
      err: `No user with id ${id} found`,
    });
  }
  // Diff admin can't
  if (
    auth.role === Role.ADMIN &&
    userDB.role === Role.ADMIN &&
    auth._id != userDB._id
  ) {
    return res.status(403).json({
      status: 403,
      err: "An admin can't update account of another admin",
    });
  }
  // Diff user can't
  if (
    auth.role === Role.USER &&
    userDB.role === Role.USER &&
    auth._id !== userDB._id
  ) {
    return res.status(403).json({
      status: 403,
      err: "No permission to update another account ",
    });
  }
  // Auth is user but op is admin
  if (auth.role === Role.USER && userDB.role === Role.ADMIN) {
    return res.status(403).json({
      status: 403,
      err: "No permission to update another account ",
    });
  }

  // Check email and username
  const { username, email, avatar } = user;
  if (username && username != userDB.username) {
    const userDBDup = await userService.findUserByUsername(username);
    if (userDBDup) {
      return res.status(409).json({
        status: 409,
        err: `Username ${username} already existed`,
      });
    }
  }
  if (email && email != userDB.email) {
    const userDBDup = await userService.findUserByEmail(email);
    if (userDBDup) {
      return res.status(409).json({
        status: 409,
        err: `Email ${email} already existed`,
      });
    }
  }
  req.middlewareStorage.userGetter = userDB;
  next();
};

module.exports = {
  userCheckerForCreate,
  userCheckerForLogin,
  userCheckerForUpdate,
};
