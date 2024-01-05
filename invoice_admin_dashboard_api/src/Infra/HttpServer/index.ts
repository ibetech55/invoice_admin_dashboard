import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import expressFileUpload from "express-fileupload";
// import '../../Configs/dotenv'
// import { AppError } from "../../ErrorHandler/AppError";
// import { PORT } from "../../Configs/dotenv/env_vars";
import { apiRoutes } from "../../Routes";
class HttpServer {
  app: express.Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.defaultHeaders();
    this.routes();
    // this.errorHandler();

    console.log("Connected to Http Server");
  }

  listen() {
    this.app.listen(5000, () => console.log(`Listening to ${5000}`));
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(expressFileUpload());
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/api", apiRoutes);
  }

  // errorHandler() {
  //   this.app.use(
  //     (err: Error, req: Request, res: Response, next: NextFunction) => {
  //       if (err instanceof AppError) {
  //         return res.status(err.statusCode).json({ message: err.message });
  //       } else {
  //         return res
  //           .status(500)
  //           .json({ message: `Internal Server Error ${err.message}` });
  //       }
  //     }
  //   );
  // }

  defaultHeaders() {
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
      );
      next();
    });
  }
}

export default new HttpServer();
