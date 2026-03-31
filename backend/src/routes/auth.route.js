import express from 'express';
import {
  listBarangays,
  listSitiosByBarangay,
  register,
  login,
  verifyOtp,
  resendOtp,
  forgotPassword,
  verifyForgotPasswordOtp,
  resetPassword,
  barangayLogin,
  logoutBarangay,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/barangays", listBarangays);
router.get("/barangays/:barangayId/sitios", listSitiosByBarangay);
router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
router.post("/reset-password", resetPassword);
router.post("/barangay/login", barangayLogin);
router.post("/logout", logoutBarangay)

export default router;
