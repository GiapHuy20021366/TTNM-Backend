import { feedbackService } from "../../services/core";

const newUserFeedback = async (req, res) => {
  const userId = req?.middlewareStorage?.authorization?._id;
  if (!userId) {
    return res.status(400).json({
      err: "Internal server error",
      status: 500,
    });
  }
  const feedback = req.body;
  feedback.user = userId;
  const feedbackDB = await feedbackService.create(feedback);
  if (!feedbackDB) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: feedbackDB,
    status: 200,
  });
};

const getAllFeedbacks = async (req, res) => {
  const feedbacks = await feedbackService.getAll();
  if (!feedbacks) {
    return res.status(500).json({
      err: "Internal server error",
      status: 500,
    });
  }
  return res.status(200).json({
    data: feedbacks,
    status: 200,
  });
};

const getFeedback = async (req, res) => {
  const feedbackId = req?.params?.id;
  if (!feedbackId) {
    return res.status(400).json({
      err: "Missing feedback id in request",
      status: 400,
    });
  }
  const feedback = await feedbackService.getById(feedbackId);
  if (!feedback) {
    return res.status(404).json({
      err: `No feedback with id ${feedbackId} found`,
      status: 500,
    });
  }
  return res.status(200).json({
    data: feedback,
    status: 200,
  });
};

const deleteFeedback = async (req, res) => {
  const feedbackId = req?.params?.id;
  const feedback = await feedbackService.deleteById(feedbackId);
  if (!feedback) {
    return res.status(500).json({
      err: `Internal server error`,
      status: 500,
    });
  }
  return res.status(200).json({
    data: feedback,
    status: 200,
  });
};

module.exports = {
  newUserFeedback,
  getAllFeedbacks,
  getFeedback,
  deleteFeedback,
};
