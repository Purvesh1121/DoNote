import { Request, Response } from "express";
import LoggerModule from "../loaders/logger";
import { DEFAULT_MESSAGES, HTTP_CODES } from "../utils/constants";
import { sendResponse } from "../utils/response";
import * as noteService from "../services/note.service";

const Logger = LoggerModule("Note_Controller");

export const createNote = async (req: Request, res: Response) => {
  try {
    // TODO: Add validations here
    const data = {
      title: req?.body?.title,
      content: req?.body?.content,
      userId: +res.locals?.userId,
    };

    const result = await noteService.createNote(data);

    if (result.success) {
      return sendResponse(res, HTTP_CODES.CREATED, result);
    } else if (result?.message === DEFAULT_MESSAGES.USER_NOT_FOUND) {
      return sendResponse(res, HTTP_CODES.NOT_FOUND, result);
    } else {
      throw new Error(result?.message);
    }
  } catch (error) {
    Logger.error(error);
    return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      success: false,
      message: error?.message || DEFAULT_MESSAGES.INTERNAL_ERR,
    });
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    // TODO: Add validations here
    const userId = res?.locals?.userId;
    const result = await noteService.getAllNotes(userId);
    if (result.success) {
      return sendResponse(res, HTTP_CODES.OK, result);
    } else if (result?.message === DEFAULT_MESSAGES.NOT_FOUND) {
      return sendResponse(res, HTTP_CODES.NOT_FOUND, result);
    } else {
      throw new Error(result?.message);
    }
  } catch (error) {
    Logger.error(error);
    return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      success: false,
      message: error?.message || DEFAULT_MESSAGES.INTERNAL_ERR,
    });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    // TODO: Add validations here
    const data = {
      noteId: +req?.params?.noteId,
      userId: res?.locals?.userId,
    };

    const result = await noteService.getNoteById(data?.userId, data?.noteId);
    if (result.success) {
      return sendResponse(res, HTTP_CODES.OK, result);
    } else if (result?.message === DEFAULT_MESSAGES.NOT_FOUND) {
      return sendResponse(res, HTTP_CODES.NOT_FOUND, result);
    } else {
      throw new Error(result?.message);
    }
  } catch (error) {
    Logger.error(error);
    return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      success: false,
      message: error?.message || DEFAULT_MESSAGES.INTERNAL_ERR,
    });
  }
};

export const updateNoteById = async (req: Request, res: Response) => {
  try {
    // TODO: Add validations here
    const data = {
      noteId: +req?.params?.noteId,
      userId: res?.locals?.userId,
      title: req?.body?.title,
      content: req?.body?.content,
    };

    const result = await noteService.updateNoteById(data);
    if (result.success) {
      // Note update successfully
      return sendResponse(res, HTTP_CODES.OK, result);
    } else if (result.message === DEFAULT_MESSAGES.NOT_FOUND) {
      // Note not found
      return sendResponse(res, HTTP_CODES.NOT_FOUND, result);
    } else if (result.message === DEFAULT_MESSAGES.DATA_NOT_UPDATED) {
      return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, result);
    } else {
      throw new Error(result?.message);
    }
  } catch (error) {
    Logger.error(error);
    return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      success: false,
      message: error?.message || DEFAULT_MESSAGES.INTERNAL_ERR,
    });
  }
};

export const deleteNoteById = async (req: Request, res: Response) => {
  try {
    // TODO: Add validations here
    const data = {
      noteId: +req?.params?.noteId,
      userId: res?.locals?.userId,
    };

    const result = await noteService.deleteNoteById(data?.userId, data?.noteId);
    if (result?.success) {
      return sendResponse(res, HTTP_CODES.OK, result);
    } else if (result?.message === DEFAULT_MESSAGES.DATA_NOT_DELETED) {
      return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, result);
    } else {
      throw new Error(result?.message);
    }
  } catch (error) {
    Logger.error(error);
    return sendResponse(res, HTTP_CODES.INTERNAL_SERVER_ERROR, {
      success: false,
      message: error?.message || DEFAULT_MESSAGES.INTERNAL_ERR,
    });
  }
};
