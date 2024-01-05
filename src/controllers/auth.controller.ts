import { Request, Response } from "express";
import LoggerModule from "../loaders/logger";
import { DEFAULT_MESSAGES } from "../utils/constants";
import * as authService from "../services/auth.service";
import { IResult } from "../types/common";

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
    const { status, ...rest } = result;
    return res.status(status).json(rest);
  } catch (error) {
    Logger.error(error);
    const message = error?.message || DEFAULT_MESSAGES.INTERNAL_ERR;
    res.status(500).json({ message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // TODO: Add validations here
  } catch (error) {
    Logger.error(error);
    const message = error?.message || DEFAULT_MESSAGES.INTERNAL_ERR;
    res.status(500).json({ message });
  }
};
