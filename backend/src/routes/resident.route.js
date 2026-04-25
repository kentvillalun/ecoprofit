import express from "express"
import { getBarangayInfo, getResidentProfile, updateResidentProfile } from "../controllers/resident.controller.js"
import { authenticateResident } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/me", authenticateResident, getResidentProfile)
router.patch("/me", authenticateResident, updateResidentProfile)
router.get("/barangay-info", authenticateResident, getBarangayInfo)

export default router