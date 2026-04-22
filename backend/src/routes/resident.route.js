import express from "express"
import { getResidentProfile } from "../controllers/resident.controller.js"
import { authenticateResident } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/me", authenticateResident, getResidentProfile)

export default router