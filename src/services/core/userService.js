import { User } from "../../db/models/index";
import { bcryptService } from "../utils/index";

const createNewUser = async (user) => {
  try {
    user.password = await bcryptService.hash(user.password);
  } catch (error) {
    console.log(error);
    return;
  }
  const newUser = new User(user);
  try {
    await newUser.save();
    return newUser;
  } catch (error) {
    return null;
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    return null;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (error) {
    return null;
  }
};

// Check duplicate email, username
const isDuplicateUser = async (user) => {
  try {
    const users = await User.find({
      $or: [
        {
          username: user.username,
        },
        {
          email: user.email,
        },
      ],
    }).exec();
    return users && users.length > 0;
  } catch (error) {
    console.log(error);
    // Return true when error to prevent create user
    return true;
  }
};

module.exports = {
  createNewUser,
  findUserById,
  isDuplicateUser,
  findUserByEmail,
};
