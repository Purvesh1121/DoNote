import { Response } from "express";

interface ApiResponse {
  data?: any;
  message: string;
  success: boolean;
}

export const createResponse = (
  success: boolean,
  message: string,
  data?: any
): ApiResponse => {
  return {
    data: success ? data : undefined,
    message,
    success,
  };
};

export const sendResponse = (
  res: Response,
  status: number,
  apiResponse: ApiResponse
): Response => {
  return res.status(status).json(apiResponse);
};
