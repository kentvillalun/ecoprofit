import { prisma } from "../config/db.js";

const getResidentProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        barangay: {
          select: {
            name: true,
          },
        },
        sitio: {
            select: {
                name: true
            }
        }
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Fetching resident info success", user: {
        firstName: user.firstName,
        lastName: user.lastName,
        sitio: user.sitio?.name,
        phoneNumber: user.phoneNumber,
        barangay: user.barangay.name,
        address: user.address
      } });
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
};

export { getResidentProfile }
