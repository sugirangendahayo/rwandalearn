// kinyalearn/backend/routes/scores.js
import express from "express";
import { saveScore, getScores } from "../controllers/scoreControllers.js";


const router = express.Router();

router.get("/", getScores);
router.post("/save", saveScore);

export default router;
