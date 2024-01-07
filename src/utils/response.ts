import { Response } from "express";

interface ApiResponse {
  data?: any;
  message: string;
  success: boolean;
}

export function createResponse(
  success: boolean,
  message: string,
  data?: any
): ApiResponse {
  return {
    data: success ? data : undefined,
    message,
    success,
  };
}

export const sendResponse = (
  res: Response,
  apiResponse: ApiResponse,
  status: number = 200
): Response => {
  return res.status(status).json(apiResponse);
};
