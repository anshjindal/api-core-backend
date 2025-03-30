const Leaves = require("../models/leaves");

const getAllLeaves = async (empId) => {
  const leaves = await Leaves.find({ empId: empId });
  return leaves;
};

const createLeave = async (leaveData) => {
  const newLeave = new Leaves(leaveData);
  return await newLeave.save();
};

const updateLeave = async (leaveId, updatedData) => {
  try {
    const existingLeave = await Leaves.findById(leaveId);

    if (!existingLeave) {
      throw new Error("Leave not found");
    }

    const updateFields = {};
    Object.keys(updatedData).forEach((key) => {
      if (
        updatedData[key] !== undefined &&
        updatedData[key] !== existingLeave[key]
      ) {
        updateFields[key] = updatedData[key];
      }
    });

    const updatedLeave = await Leaves.findByIdAndUpdate(
      leaveId,
      { $set: updateFields },
      { new: true }
    );

    return updatedLeave;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
    getAllLeaves,
    createLeave,
    updateLeave
};
