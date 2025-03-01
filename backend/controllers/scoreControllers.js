// kinyalearn/backend/controllers/saveScore.js
import db from "../configs/db.config.js";
import jwt from "jsonwebtoken";

// kinyalearn/backend/controllers/saveScore.js
const saveScore = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const {userId, score, level } = req.body; // user_id in body is ignored

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = decoded.userId; // This must exist in token

    const query = `INSERT INTO scores (user_id, score, level) VALUES (?, ?, ?)`;
    db.query(query, [userId, score, level], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error saving score" });
      }
      res.status(201).json({ message: "Score saved successfully", id: result.insertId });
    });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
const getScores = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const query = `SELECT score, level FROM scores WHERE user_id = ? ORDER BY created_at DESC`;
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ error: "Database error fetching scores" });
      }
      res.status(200).json({ results });
    });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export {saveScore, getScores};
