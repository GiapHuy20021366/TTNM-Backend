import methodOverride from "method-override";
import cors from "cors";
import bodyParser from "body-parser";
import { middlewareStorage, authMiddleware } from "../controllers/middlewares";

const configMiddlewares = (app) => {
  app.use(bodyParser.json());
  app.use(methodOverride("_method"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors({ origin: true }));
  app.use(middlewareStorage);
  app.use(authMiddleware.jwtTokenParser);
  app.use(/.*api.auth.*/, authMiddleware.jwtTokenValidChecker);
};

export default configMiddlewares;
