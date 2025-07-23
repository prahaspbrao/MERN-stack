import express from "express";
import {getAllNotes , createNotes , UpdateNotes, DeleteNotes, GetNoteByID} from "../controllers/notesController.js";

const router = express.Router();

router.get("/" ,getAllNotes );
router.get("/:id",GetNoteByID);
router.post("/" , createNotes);
router.put("/:id" , UpdateNotes);
router.delete("/:id" , DeleteNotes);

export default router;