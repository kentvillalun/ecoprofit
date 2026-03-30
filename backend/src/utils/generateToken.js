import jwt from "jsonwebtoken";

export const generateToken = ({id, role, barangayId}) => {
    const payload = {
      id: id,
      role: role,
      barangayId: barangayId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return token;
}