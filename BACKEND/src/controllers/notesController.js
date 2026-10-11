// Import the Mongoose model used to query and modify notes in MongoDB.
import Note from "../../MODEL/Note.js";

// Handle GET requests that ask for the complete collection of notes.
export const getAllNotes = async (req, res) => {
  try {
    // Fetch all notes and sort descending by creation date so newest notes come first.
    const notes = await Note.find().sort({ createdAt: -1 });
    // Return the resulting array as JSON with HTTP 200 (OK).
    res.status(200).json(notes);
  } catch (error) {
    // Log the database or server error for debugging, then return a generic server error.
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handle GET requests for one note, using the URL's :id parameter as its MongoDB ID.
export const getNoteById = async (req, res) => {
  try {
    // Ask Mongoose to find the document whose identifier matches the route parameter.
    const getNote = await Note.findById(req.params.id);
    // Return 404 when no document exists for the supplied identifier.
    if (!getNote) return res.status(404).json({ message: "Note not found" });
    // Return the matched note as JSON with HTTP 200 (OK).
    res.status(200).json(getNote);
  } catch (error) {
    // Log unexpected lookup failures and send a generic HTTP 500 response.
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handle POST requests that create a note from the request's JSON body.
export const createNote = async (req, res) => {
  try {
    // Read the two note fields supplied by the client.
    const { title, content } = req.body;
    // Build a Mongoose document; the schema validates its required fields when saved.
    const note = new Note({ title, content });

    // Save the new document to MongoDB and retain the saved version, including its ID.
    const savedNote = await note.save();
    // Return the newly created document and HTTP 201 (Created).
    res.status(201).json(savedNote);
  } catch (error) {
    // Log creation or validation failures and send a generic HTTP 500 response.
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handle PUT requests that update a note identified by the URL's :id parameter.
export const updateNote = async (req, res) => {
  try {
    // Read the replacement title and content from the client's JSON body.
    const { title, content } = req.body;
    // Find the note by ID and update its title and content in MongoDB.
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });

    // Send 404 when the ID is missing; this code then continues to the response below.
    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
    }

    // Send the success response; this also runs after the 404 branch above.
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    // Log database or server failures and send a generic HTTP 500 response.
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handle DELETE requests that remove a note identified by the URL's :id parameter.
export const deleteNote = async (req, res) => {
  try {
    // Find the note by ID, delete it from MongoDB, and retain the deleted document if found.
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    // Send 404 when the ID is missing; this code then continues to the response below.
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
    }
    // Send the success response; this also runs after the 404 branch above.
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    // Log database or server failures and send a generic HTTP 500 response.
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
