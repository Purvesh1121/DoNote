import { Note } from "../entity/Note";
import { User } from "../entity/User";
import { DatabaseSource } from "../loaders/database";
import LoggerModule from "../loaders/logger";
import { ICreateNote } from "../types/note";
import { DEFAULT_MESSAGES } from "../utils/constants";
import { createResponse } from "../utils/response";

const Logger = LoggerModule("Note_Service");

const userRepository = DatabaseSource.getRepository(User);
const noteRepository = DatabaseSource.getRepository(Note);

export const createNote = async (noteData: ICreateNote) => {
  try {
    // Check user
    const existingUser = await userRepository.findOneBy({
      userId: noteData?.userId,
    });

    if (!existingUser) {
      return createResponse(false, DEFAULT_MESSAGES.USER_NOT_FOUND);
    }

    // Create note
    const note = new Note();
    note.title = noteData?.title;
    note.content = noteData?.content;
    note.userId = noteData?.userId;

    const savedNote = await noteRepository.save(note);
    return createResponse(
      true,
      DEFAULT_MESSAGES.DATA_CREATED_SUCCESSFULLY,
      savedNote
    );
  } catch (error) {
    Logger.error(error);
    return createResponse(
      false,
      error?.message || DEFAULT_MESSAGES.INTERNAL_ERR
    );
  }
};

export const getAllNotes = async (userId: number) => {
  try {
    const allNotes = await noteRepository.find({ where: { userId } });
    if (!allNotes?.length) {
      return createResponse(false, DEFAULT_MESSAGES.NOT_FOUND);
    }

    return createResponse(true, DEFAULT_MESSAGES.SUCCESSFUL, allNotes);
  } catch (error) {
    Logger.error(error);
    return createResponse(
      false,
      error?.message || DEFAULT_MESSAGES.INTERNAL_ERR
    );
  }
};

export const getNoteById = async (userId: number, noteId: number) => {
  try {
    const note = await noteRepository.findOneBy({ userId, noteId });
    if (!note) {
      return createResponse(false, DEFAULT_MESSAGES.NOT_FOUND);
    }
    return createResponse(true, DEFAULT_MESSAGES.SUCCESSFUL, note);
  } catch (error) {
    Logger.error(error);
    return createResponse(
      false,
      error?.message || DEFAULT_MESSAGES.INTERNAL_ERR
    );
  }
};
