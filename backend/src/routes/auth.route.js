import express from 'express';
import {
  listBarangays,
  listSitiosByBarangay,
  register,
  login,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/barangays", listBarangays);
router.get("/barangays/:barangayId/sitios", listSitiosByBarangay);
router.post("/register", register);
router.post("/login", login);


export default router;
