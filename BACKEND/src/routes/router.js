// Import Express so this module can create a router for note-related endpoints.
import express from "express";
// Import the controller functions that implement each note operation.
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNoteById,
} from "../controllers/notesController.js";

// Create a modular router that the main app mounts under its notes API path.
const router = express.Router();

// Map GET / to the controller that returns every note.
router.get("/", getAllNotes);

// Map GET /:id to the controller that returns a note matching the URL ID.
router.get("/:id", getNoteById);

// Map POST / to the controller that creates a note from the request body.
router.post("/", createNote);

// Map PUT /:id to the controller that updates the note matching the URL ID.
router.put("/:id", updateNote);

// Map DELETE /:id to the controller that removes the note matching the URL ID.
router.delete("/:id", deleteNote);

// Export the configured router so the main Express app can mount these endpoints.
export default router;
