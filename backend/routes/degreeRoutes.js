import express from "express";
import getAlldegrees from "../controllers/degreesController.js";

const router = express();

router.get("/", getAlldegrees);

export default router;
