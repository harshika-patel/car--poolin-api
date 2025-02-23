import express from "express";
import { loginUser, getAllUsers } from "../controllers/loginUserController.js";

const router = express.Router();

router.post("/", loginUser);
router.get("/",getAllUsers);

export default router;
