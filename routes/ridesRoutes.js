import express from "express";
import { getRidesList, registerRide } from "../controllers/ridesController.js";

const router = express.Router();

router.get("/", getRidesList);
router.post("/", registerRide);

export default router;
