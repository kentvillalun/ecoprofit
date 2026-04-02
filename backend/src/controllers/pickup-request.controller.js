import { prisma } from "../config/db.js";

const pickupRequest = async (req, res) => {
  try {
    const { materialType, estimatedWeight, weightUnit, photoUrl, notes } =
      req.body ?? {};

    const userId = req.user.id;

    if (!materialType || !estimatedWeight || !weightUnit || !photoUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await prisma.pickupRequests.create({
      data: {
        userId,
        materialType,
        estimatedWeight,
        weightUnit,
        photoUrl,
        notes,
      },
    });

    return res.status(200).json({ message: "Request submittion success" });
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
};


export {
    pickupRequest
}