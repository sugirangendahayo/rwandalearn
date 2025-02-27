import db from "../configs/db.config.js";

const getUserData = async (req, res) => {
  const email = req.email; // Extracted from the token

  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Database error while verifying user" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(200).json({ results });
  });
};
export default getUserData;
