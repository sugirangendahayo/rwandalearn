import exress from "express";
import getUserData from "../controllers/userController.js";

const router = exress.Router();

router.get("/", getUserData);

export default router;
