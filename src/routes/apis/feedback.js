import { feedbackMiddleware } from "../../controllers/middlewares";
import { feedbackTask } from "../../controllers/tasks";
import { Method } from "../../constant";
import { Role } from "../../constant";

const newFeedback = {
  method: Method.POST,
  path: "/api/v1/feedbacks",
  auth: true,
  permissions: [Role.USER],
  middlewares: [feedbackMiddleware.feedbackChecker],
  task: feedbackTask.newUserFeedback,
  description: "create a new feedback",
};

const allFeedback = {
  method: Method.GET,
  path: "/api/v1/feedbacks",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: feedbackTask.getAllFeedbacks,
  description: "get all feedbacks",
};

const getFeedback = {
  method: Method.GET,
  path: "/api/v1/feedbacks/:id",
  auth: false,
  permissions: [Role.ANY],
  middlewares: [],
  task: feedbackTask.getFeedback,
  description: "get one feedback by id",
};

const deleteFeedback = {
  method: Method.DELETE,
  path: "/api/v1/feedbacks/:id",
  auth: true,
  permissions: [Role.USER],
  middlewares: [feedbackMiddleware.feedbackCheckerForDelete],
  task: feedbackTask.deleteFeedback,
  description: "get one feedback by id",
};

module.exports = {
  newFeedback,
  allFeedback,
  getFeedback,
  deleteFeedback,
};
