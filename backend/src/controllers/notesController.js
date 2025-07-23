import Note from "../models/Note.js";

// GET all notes
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    // Safely return notes and exit the function
    return res.status(200).json(notes);
  } catch (error) {
    // If something failed, log the error and send the error response
    console.error("Error in getAllNotes controller!!", error);

    // Only send this if response hasn't already been sent
    return res.status(500).json({
      message: "Internal Server Error!!",
    });
  }
}

// GET note by ID
export async function GetNoteByID(req, res) {
  try {
    const GotNotes = await Note.findById(req.params.id);

    if (!GotNotes) {
      return res.status(404).json({ message: "Note not found!!" });
    }

    return res.status(200).json(GotNotes);
  } catch (error) {
    console.error("Error in GetNoteByID controller!!", error);
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
}

// POST create new note
export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNotes controller!!", error);
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
}

// PUT update note
export async function UpdateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found!!" });
    }

    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in UpdateNotes controller!!", error);
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
}

// DELETE note
export async function DeleteNotes(req, res) {
  try {
    const deletedNotes = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNotes) {
      return res.status(404).json({ message: "Note not found!!" });
    }

    return res.status(200).json(deletedNotes);
  } catch (error) {
    console.error("Error in DeleteNotes controller!!", error);
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
}
