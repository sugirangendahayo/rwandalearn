import exress from "express";
import languagesController from "../controllers/translationController.js";


const router = exress.Router();

router.get("/", languagesController);

export default router;
