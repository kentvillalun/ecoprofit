import express from "express"
import { authenticateResident, authenticateBarangay, requireRoles } from "../middlewares/authMiddleware.js"
import { listRequests, pickupRequest, updateStatus, getRequest } from "../controllers/pickup-request.controller.js"

const router = express.Router()


router.post("/", authenticateResident, requireRoles(["RESIDENT"]), pickupRequest)
router.get("/collection-requests", authenticateBarangay, requireRoles(["CAPTAIN", "SECRETARY", "COLLECTOR"]), listRequests)
router.get("/collection-requests/:id", authenticateBarangay, requireRoles(["CAPTAIN", "SECRETARY", "COLLECTOR"]), getRequest)
router.patch("/collection-requests/:id", authenticateBarangay, requireRoles(["CAPTAIN", "SECRETARY", "COLLECTOR"]), updateStatus)


export default router;