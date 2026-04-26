import { prisma } from "../config/db.js";

const getDashboardStats = async (req, res) => {
  try {
    const [requestedCount, totalRecords, unverified] = await Promise.all([
      prisma.pickupRequests.count({
        where: { status: "REQUESTED" },
      }),
      prisma.pickupRequests.count({
        where: { status: "COLLECTED" },
      }),
      prisma.user.count({
        where: { isVerified: false, role: "RESIDENT" },
      }),
    ]);

 
    return res.status(200).json({
      message: "Fetch success",
      requestedCount,
      totalRecords,
      unverified,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
 
export { getDashboardStats, }