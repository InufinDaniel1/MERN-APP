// Load Mongoose so this file can define a MongoDB document schema and model.
import mongoose from "mongoose";

// Define the fields and validation rules that every note document must follow.
const noteSchema = new mongoose.Schema(
  {
    // Store the note's title as text and reject documents that omit it.
    title: {
      type: String,
      required: true,
    },
    // Store the note's main text as text and reject documents that omit it.
    content: {
      type: String,
      required: true,
    },
  },
  {
    // Have Mongoose automatically add createdAt and updatedAt date fields.
    timestamps: true,
  },
);

// Create the Note model, which provides methods for reading and writing note documents.
const Note = mongoose.model("Note", noteSchema);

// Make the model available to controllers and other modules that import this file.
export default Note;
