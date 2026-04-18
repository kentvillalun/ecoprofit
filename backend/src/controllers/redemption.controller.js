import { prisma } from "../config/db.js";

const createProgram = async (req, res) => {
  try {
    const { name, allotedBudget, maxPoints, programMaterial, description } =
      req.body ?? {};

    if (
      !name ||
      !allotedBudget ||
      !maxPoints ||
      !programMaterial ||
      !description
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const record = await prisma.program.create({
      data: {
        name,
        allotedBudget,
        maxPoints,
        description,
        programMaterial: {
          createMany: {
            data: programMaterial,
          },
        },
      },
    });

    return res.status(201).json({ message: "Program created", record });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPrograms = async (req, res) => {
  try {
    const programs = await prisma.program.findMany({
      include: {
        programMaterial: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Fetching requests successful", programs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProgram = async (req, res) => {
  try {
    const { id } = req.params;

    const program = await prisma.program.findUnique({
      where: { id },
      include: {
        programMaterial: {
            include: {
                redemptionTransaction: {
                  include: {
                    programMaterial: true
                  }
                }
            }
        }
      },
    });

    if (!program) {
      return res.status(404).json({ error: "Program does not exist" });
    }

    return res.status(200).json({
      message: "Fetching successful",
      program,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, allotedBudget, description, maxPoints, isActive } =
      req.body ?? {};

    const data = {}
    if (name !== undefined) data.name = name
    if (allotedBudget !== undefined) data.allotedBudget = allotedBudget
    if (description !== undefined) data.description = description
    if (maxPoints !== undefined) data.maxPoints = maxPoints
    if (isActive !== undefined) data.isActive = isActive

    const success = await prisma.program.update({
      where: { id },
      data
    });

    return res.status(200).json({ message: "Update successful"})
  } catch (error) {
    return res.status(400).json({ error: error.message})
  }
};

const createTransaction = async (req, res) => {
  try {
    const {
      programMaterialId,
      quantity,
      collectorName,
      beneficiaryName,
      educationalLevel,
    } = req.body ?? {};

    if (
      !programMaterialId ||
      !quantity ||
      !collectorName ||
      !beneficiaryName ||
      !educationalLevel
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const currentValue = await prisma.programMaterial.findUnique({
      where: { id: programMaterialId },
      select: {
        pointValue: true,
      },
    });

    if (!currentValue) {
      return res.status(404).json({ error: "Material type not found" });
    }

    const transaction = await prisma.redemptionTransaction.create({
      data: {
        quantity,
        collectorName,
        beneficiaryName,
        educationalLevel,
        currentPointValue: currentValue.pointValue,
        programMaterialId,
      },
    });

    return res.status(201).json({
      message: "Transaction Created",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.redemptionTransaction.findMany({
      include: {
        programMaterial: {
          include: {
            program: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Fetching trasactions successful",
      transactions,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createProgram,
  getPrograms,
  getProgram,
  createTransaction,
  getTransactions,
  updateProgram,
};
