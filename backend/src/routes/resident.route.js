import express from "express"
import { getBarangayInfo, getResidentProfile } from "../controllers/resident.controller.js"
import { authenticateResident } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/me", authenticateResident, getResidentProfile)
router.get("/barangay-info", authenticateResident, getBarangayInfo)

export default router