import express from "express";
import * as noteController from "../controllers/note.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();
router.use("/", isAuthenticated);
router.post("/", noteController.createNote);
router.get("/", noteController.getAllNotes);
router.get("/:noteId", noteController.getNoteById);
router.put("/:noteId", noteController.updateNoteById);
router.delete("/:noteId", noteController.deleteNoteById);

// Note Endpoints:
// GET /api/notes: Get a list of all notes for the authenticated user.
// GET /api/notes/:id: Get a note by ID for the authenticated user.
// POST /api/notes: Create a new note for the authenticated user.
// PUT /api/notes/:id: Update an existing note by ID for the authenticated user.
// DELETE /api/notes/:id: Delete a note by ID for the authenticated user.
// POST /api/notes/:id/share: Share a note with another user for the authenticated user.
// GET /api/search?q=:query: Search for notes based on keywords for the authenticated user.
export default router;
