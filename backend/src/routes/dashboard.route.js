import express from "express";
import { authenticate, requireRoles } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", authenticate, requireRoles(['CAPTAIN']), (req, res) => {
    return res.status(200).json({ message: "Welcome to the dashboard"})
})

export default router;