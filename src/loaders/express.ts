import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "../config";
import routes from "../routes";

const app = express();
app.use(cors());
app.use(express.json());

// TODO: Add other middlewares here (eg. rate limiter)

// Load API routes
app.use(config.api.prefix || "/api", routes);

// Middleware function to handle 404 errors
const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "route not found" });
};

// catch 404 and forward to error handler
app.use(handleNotFound);

export default app;
