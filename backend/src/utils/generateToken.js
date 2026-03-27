import jwt from "jsonwebtoken";

export const generateToken = (userId, userRole, userBarangayId) => {
    const payload = {
      id: userId,
      role: userRole,
      barangayId: userBarangayId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return token;
}