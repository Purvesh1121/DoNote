import { Request, Response, NextFunction } from "express";
import LoggerModule from "../loaders/logger";
import config from "../config";
import { sendResponse } from "../utils/response";
import { DEFAULT_MESSAGES, HTTP_CODES } from "../utils/constants";
import jwt from "jsonwebtoken";
import { IAccessTokenPayload } from "../types/auth";

const Logger = LoggerModule("isAuthenticated_Middleware");
const { jwtSecret } = config;

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeaders(req);
    if (!token) {
      return sendResponse(res, HTTP_CODES.UNAUTHORIZED, {
        success: false,
        message: DEFAULT_MESSAGES.ACCESS_TOKEN_REQUIRED,
      });
    }

    const payload: IAccessTokenPayload = jwt.verify(
      token,
      jwtSecret
    ) as IAccessTokenPayload;

    res.locals.userId = payload?.userId;
    next();
  } catch (error) {
    Logger.error(error);
    return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      success: false,
      message: error?.message || DEFAULT_MESSAGES.INTERNAL_ERR,
    });
  }
};

const getTokenFromRequestHeaders = (req: Request) => {
  const authFromReqHeaders = req?.headers?.authorization?.split(" ");
  if (authFromReqHeaders && authFromReqHeaders[0] === "Bearer") {
    return authFromReqHeaders[1];
  }
  return null;
};
