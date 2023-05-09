import { feedbackService } from "../../services/core";
import { Role } from "../../constant";

const feedbackChecker = async (req, res, next) => {
  const auth = req?.middlewareStorage?.authorization;
  if (!auth?._id) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error. Invalid Token cause by login method",
    });
  }

  const invalidKey = ["title", "type", "description"].find(
    (key) => !req.body[key]
  );
  if (invalidKey) {
    return res.status(400).json({
      err: `Missing ${invalidKey} field in request`,
      status: 400,
    });
  }

  next();
};

const feedbackCheckerForDelete = async (req, res, next) => {
  const auth = req?.middlewareStorage?.authorization;
  if (!auth?.role) {
    return res.status(500).json({
      status: 500,
      err: "Internal server error. Invalid Token cause by login method",
    });
  }
  const role = auth.role;
  const userId = auth._id;
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
  if (role !== Role.ADMIN && feedback.user !== userId) {
    return res.status(403).json({
      err: "No permission to delete this feedback. Only admin or own",
    });
  }
  next();
};

module.exports = {
  feedbackChecker,
  feedbackCheckerForDelete,
};
