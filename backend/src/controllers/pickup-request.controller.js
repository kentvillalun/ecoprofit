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
    return res.status(500).json({ error: error.message });
  }
};

const listRequests = async (req, res) => {
  try {
    const requests = await prisma.pickupRequests.findMany({
      select: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            sitio: { select: { name: true } },
            phoneNumber: true,
          },
        },
        id: true,
        createdAt: true,
        materialType: true,
        estimatedWeight: true,
        weightUnit: true,
        status: true,
        approvedAt: true,
        isScheduled: true
      },
    });

    return res.status(200).json({
      message: "Fetching requests successful",
      requests,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason, actualWeight } = req.body ?? {};

    if (status === "APPROVED") {
      await prisma.pickupRequests.update({
        where: { id },
        data: { status: "APPROVED", approvedAt: new Date() },
      });

      return res.status(200).json({ message: "Request Approved" });
    }

    if (status === "IN_PROGRESS") {
      await prisma.pickupRequests.update({
        where: { id },
        data: { isScheduled: true, status: "IN_PROGRESS" },
      });

      return res.status(200).json({ message: "Request Scheduled " });
    }

    if (status === "COLLECTED") {
      await prisma.pickupRequests.update({
        where: { id },
        data: {
          status: "COLLECTED",
          collectedAt: new Date(),
          actualWeight: actualWeight,
        },
      });

      return res.status(200).json({ message: "Request Collected " });
    }

    if (status === "REJECTED") {
      if (!rejectionReason) {
        return res
          .status(400)
          .json({ error: "Missing rejection reason field" });
      }

      await prisma.pickupRequests.update({
        where: { id },
        data: {
          status: "REJECTED",
          rejectedAt: new Date(),
          rejectionReason: rejectionReason,
        },
      });

      return res.status(200).json({ message: "Request Rejected " });
    }

    return res.status(400).json({ error: "Invalid request" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { pickupRequest, listRequests, updateStatus };
