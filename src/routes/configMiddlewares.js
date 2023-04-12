import methodOverride from "method-override";
import cors from "cors";
import bodyParser from "body-parser";
import { middlewareStorage } from "../controllers/middlewares";

const configMiddlewares = (app) => {
  app.use(bodyParser.json());
  app.use(methodOverride("_method"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors({ origin: true }));
  app.use(middlewareStorage);
};

export default configMiddlewares;
