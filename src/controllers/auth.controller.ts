import { Request, Response } from "express";
import LoggerModule from "../loaders/logger";
import { DEFAULT_MESSAGES, HTTP_CODES } from "../utils/constants";
import * as authService from "../services/auth.service";
import { sendResponse } from "../utils/response";

const Logger = LoggerModule("Auth_Controller");

export const signup = async (req: Request, res: Response) => {
  try {
    // TODO: Add validations here
    const data = {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body.email,
      password: req?.body?.password,
    };

    const result = await authService.signup(data);
    return sendResponse(res, HTTP_CODES.CREATED, result);
  } catch (error) {
    Logger.error(error);
    return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      success: false,
      message: error?.message || DEFAULT_MESSAGES.INTERNAL_ERR,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // TODO: Add validations here
    const data = {
      email: req?.body?.email,
      password: req?.body?.password,
    };

    const result = await authService.login(data);
    if (result.success) {
      return sendResponse(res, HTTP_CODES.OK, result);
    } else if (result.message === DEFAULT_MESSAGES.USER_NOT_FOUND) {
      return sendResponse(res, HTTP_CODES.NOT_FOUND, result);
    } else if (result.message === DEFAULT_MESSAGES.INVALID_CREDENTIALS) {
      return sendResponse(res, HTTP_CODES.UNAUTHORIZED, result);
    } else {
      return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
        success: false,
        message: DEFAULT_MESSAGES.INTERNAL_ERR,
      });
    }
  } catch (error) {
    Logger.error(error);
    return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      success: false,
      message: error?.message || DEFAULT_MESSAGES.INTERNAL_ERR,
    });
  }
};
