import express from "express"
import { authenticate, requireRoles } from "../middlewares/authMiddleware.js"
import { listRequests, pickupRequest, updateStatus } from "../controllers/pickup-request.controller.js"

const router = express.Router()


router.post("/", authenticate, requireRoles(["RESIDENT"]), pickupRequest)
router.get("/collection-requests", authenticate, requireRoles(["CAPTAIN", "SECRETARY", "COLLECTOR"]), listRequests)
router.patch("/collection-requests/:id", authenticate, requireRoles(["CAPTAIN", "SECRETARY", "COLLECTOR"]), updateStatus)


export default router;