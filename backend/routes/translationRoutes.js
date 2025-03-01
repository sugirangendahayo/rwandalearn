import exress from "express";
import translateController from "../controllers/translationController.js";


const router = exress.Router();

router.get("/", translateController);


export default router;