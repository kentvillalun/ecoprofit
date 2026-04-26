import express from "express";
import { authenticateBarangay, requireRoles } from "../middlewares/authMiddleware.js";
import { getDashboardStats, getRecentTransactions } from "../controllers/dashboard.controller.js";


const router = express.Router();

router.get("/", authenticateBarangay, requireRoles(['CAPTAIN']), getDashboardStats)
router.get("/recent-transactions", authenticateBarangay, requireRoles(['CAPTAIN']), getRecentTransactions)


export default router;