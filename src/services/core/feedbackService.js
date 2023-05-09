import { Feedback } from "../../db/models";

const create = async (feedback) => {
  try {
    const feedbackDB = new Feedback(feedback);
    await feedbackDB.save();
    return feedbackDB;
  } catch (error) {
    return null;
  }
};

const getById = async (feedbackId) => {
  try {
    const feedBackDB = await Feedback.findById(feedbackId)
      .populate({
        path: "user",
        select: "-password",
      })
      .exec();
    return feedBackDB;
  } catch (error) {
    return null;
  }
};

const deleteById = async (feedbackId) => {
  try {
    const feedBackDB = await Feedback.findByIdAndRemove(feedbackId).exec();
    return feedBackDB;
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  try {
    const feedBackDBs = await Feedback.find()
      .populate({
        path: "user",
        select: "-password",
      })
      .exec();
    return feedBackDBs;
  } catch (error) {
    return null;
  }
};

module.exports = {
  create,
  getById,
  deleteById,
  getAll,
};
