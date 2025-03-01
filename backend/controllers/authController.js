import bcrypt from "bcrypt";
import express from "express";
import db from "../configs/db.config.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import nodemailer from "nodemailer";
// import crypto from "crypto";
import roles from "../middlewares/roles.js";

dotenv.config();
const app = express();
app.use(cookieParser());
const saltRounds = 10; // Used for bcrypt hashing



const signupUser = (req, res) => {
  const { first_name, last_name, email, password, nationality } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send({ error: "Error processing password" });
    }

    // Get the ID of the 'Beginner' level
    db.query("SELECT id FROM levels WHERE name = 'Beginner'", (err, result) => {
      if (err) {
        console.error("Error fetching level:", err);
        return res.status(500).send({ error: "Database error" });
      }

      if (result.length === 0) {
        return res.status(500).send({ error: "Beginner level not found" });
      }

      const beginnerLevelId = result[0].id;

      // Insert new user with default level_id (Beginner)
      db.query(
        `INSERT INTO users (first_name, last_name, email, password, nationality, level_id) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          first_name,
          last_name,
          email,
          hashedPassword,
          nationality,
          beginnerLevelId,
        ],
        (err) => {
          if (err) {
            console.error("Error registering user:", err);
            return res.status(500).send({ error: "Failed to register user." });
          }
          res.status(201).send({ message: "User registered successfully!" });
        }
      );
    });
  });
};
// const updateUserLevel = (req, res) => {
//   const { user_id } = req.params;

//   // Get current level of the user
//   db.query(
//     "SELECT level_id FROM users WHERE id = ?",
//     [user_id],
//     (err, result) => {
//       if (err) {
//         console.error("Error fetching user level:", err);
//         return res.status(500).send({ error: "Database error" });
//       }

//       if (result.length === 0) {
//         return res.status(404).send({ error: "User not found" });
//       }

//       const currentLevelId = result[0].level_id;

//       // Get the next level (if available)
//       db.query(
//         "SELECT id FROM levels WHERE id > ? ORDER BY id ASC LIMIT 1",
//         [currentLevelId],
//         (err, nextLevelResult) => {
//           if (err) {
//             console.error("Error fetching next level:", err);
//             return res.status(500).send({ error: "Database error" });
//           }

//           if (nextLevelResult.length === 0) {
//             return res
//               .status(400)
//               .send({ message: "User has already completed all levels" });
//           }

//           const nextLevelId = nextLevelResult[0].id;

//           // Update user level
//           db.query(
//             "UPDATE users SET level_id = ? WHERE id = ?",
//             [nextLevelId, user_id],
//             (err) => {
//               if (err) {
//                 console.error("Error updating user level:", err);
//                 return res
//                   .status(500)
//                   .send({ error: "Failed to update user level." });
//               }
//               res
//                 .status(200)
//                 .send({ message: "User level updated successfully!" });
//             }
//           );
//         }
//       );
//     }
//   );
// };





const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ Error: "Email and password are required" });
  }

  try {
    // Check if user exists
    const userQuery = "SELECT id, email, password FROM users WHERE email = ?";
    db.query(userQuery, [email], (err, userResult) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ Error: "Database error" });
      }

      if (userResult.length === 0) {
        return res.status(404).json({ Error: "User not found" });
      }

      const user = userResult[0];
      const hashedPassword = user.password;

      // Verify password
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          console.error("Password verification error:", err);
          return res.status(500).json({ Error: "Error verifying password" });
        }

        if (!isMatch) {
          return res.status(401).json({ Error: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: roles.USER,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        // Send response matching frontend expectations
        return res.status(200).json({
          message: "Successfully logged in!",
          role: roles.USER,
          token: token,
          user: {
            id: user.id,
            email: user.email,
            role: roles.USER,
          },
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};



const logout = async (req, res) => {
  try {
    // Since JWT is stateless, no server-side action is needed unless blacklisting is implemented
    // For now, simply return a success response
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error during logout" });
  }
};

export { signupUser, login, logout };
