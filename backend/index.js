import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import verifyUser from "./middlewares/verifyUser.js";
import translationRoutes from "./routes/translationRoutes.js";
import languageRoutes from "./routes/languageRoutes.js";
import degreeRoutes from "./routes/degreeRoutes.js"
import scoreRoutes from "./routes/scoreRoutes.js"
import roles from "./middlewares/roles.js";
import path from "path";

import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyUser(roles.USER), userRoutes);
app.use("/api/translate", translationRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/level", degreeRoutes);
app.use("/api/scores", scoreRoutes);


// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Start the server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
