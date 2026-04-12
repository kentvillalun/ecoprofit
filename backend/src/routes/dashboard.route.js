import express from "express";
import { authenticateBarangay, requireRoles } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", authenticateBarangay, requireRoles(['CAPTAIN']), (req, res) => {
    return res.status(200).json({ message: "Welcome to the dashboard"})
})

export default router;