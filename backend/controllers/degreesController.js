import db from "../configs/db.config.js";

const getAlldegrees = async (req, res) => {
  try {
    

    const degrees = await new Promise((resolve, reject) => {
      db.query(
        "SELECT id, name FROM levels ORDER BY id ASC",
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });

    if (degrees.length === 0) {
      return res.status(404).json({ error: "No level found." });
    }

    res.status(200).json({ degrees });
  } catch (error) {
    console.error("Error fetching levels:", error);
    res.status(500).json({ error: "Failed to fetch levels." });
  }
};
export default getAlldegrees;
