import express from "express"
import { authenticate, requireRoles } from "../middlewares/authMiddleware.js"
import { pickupRequest } from "../controllers/pickup-request.controller.js"

const router = express.Router()


router.post("/", authenticate, requireRoles(["RESIDENT"]), pickupRequest)



export default router;