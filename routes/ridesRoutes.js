import express from "express";
import { getRidesList, registerRide ,getRideById,bookRide,cancelRide, getRidesByLocation} from "../controllers/ridesController.js";

const router = express.Router();

router.get("/", getRidesList);
router.post("/", registerRide);
router.get("/search", getRidesByLocation);

router.get("/:id",getRideById);
router.post('/:id/book',bookRide);
router.delete('/:id/cancel',cancelRide);
export default router;
