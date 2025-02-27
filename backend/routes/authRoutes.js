import express from "express";
import {
  login,
  logout,
  signupUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register-user", signupUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;
