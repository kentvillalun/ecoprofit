import express from "express";
import { authenticateBarangay, requireRoles } from "../middlewares/authMiddleware.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";


const router = express.Router();

router.get("/", authenticateBarangay, requireRoles(['CAPTAIN']), getDashboardStats)


export default router;