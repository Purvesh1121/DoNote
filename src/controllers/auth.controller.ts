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
  } catch (error) {
    Logger.error(error);
    return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      success: false,
      message: error?.message || DEFAULT_MESSAGES.INTERNAL_ERR,
    });
  }
};
