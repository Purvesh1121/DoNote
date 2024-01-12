import { Note } from "../entity/Note";
import { User } from "../entity/User";
import { DatabaseSource } from "../loaders/database";
import LoggerModule from "../loaders/logger";
import { ICreateNote, IUpdateNoteById } from "../types/note";
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

export const updateNoteById = async (data: IUpdateNoteById) => {
  try {
    // check if noteId belongs to the user
    Logger.info("Updating Note...");
    const { userId, noteId, ...dataToUpdate } = data;
    const existingNote = await noteRepository.findOneBy({ userId, noteId });
    if (!existingNote) {
      Logger.error(`Note with noteId=${noteId} and userId=${userId} not found`);
      return createResponse(false, DEFAULT_MESSAGES.NOT_FOUND);
    }

    // update note data
    const updateNoteStatus = await noteRepository.update(
      { userId, noteId },
      dataToUpdate
    );

    if (updateNoteStatus?.affected === 0) {
      Logger.info(`Note not updated`);
      return createResponse(false, DEFAULT_MESSAGES.DATA_NOT_UPDATED);
    }

    Logger.info(`Note Updated Successfully`);
    return createResponse(true, DEFAULT_MESSAGES.DATA_UPDATED_SUCCESSFULLY);
  } catch (error) {
    Logger.error(error);
    return createResponse(
      false,
      error?.message || DEFAULT_MESSAGES.INTERNAL_ERR
    );
  }
};

export const deleteNoteById = async (userId: number, noteId: number) => {
  try {
    // Delete the note with userId and noteId
    const deletedNoteStatus = await noteRepository.delete({ userId, noteId });
    if (deletedNoteStatus?.affected === 0) {
      Logger.error(
        `Unable to update note with noteId=${noteId} and userId=${userId}`
      );
      return createResponse(false, DEFAULT_MESSAGES.DATA_NOT_DELETED);
    }
    return createResponse(true, DEFAULT_MESSAGES.NOTE_DELETD_SUCCESSFULLY);
  } catch (error) {
    Logger.error(error);
    return createResponse(
      false,
      error?.message || DEFAULT_MESSAGES.INTERNAL_ERR
    );
  }
};
