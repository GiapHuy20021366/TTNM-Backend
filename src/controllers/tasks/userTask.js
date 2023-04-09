import { userService } from "../../services/core/index";
import { jwtService } from "../../services/utils/index";

const createNewUser = async (req, res) => {
  const user = req.body;
  const newUser = await userService.createNewUser(user);
  if (!newUser) {
    return res.status(500).send("Internal Server Error");
  }
  const resUser = {
    ...newUser._doc,
  };
  delete resUser.password;
  const token = jwtService.signToken(resUser);
  return res.status(200).json({
    data: resUser,
    token,
  });
};

module.exports = {
  createNewUser,
};
