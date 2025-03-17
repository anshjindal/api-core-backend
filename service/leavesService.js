const Leaves = require("../models/leaves");

exports.getAllLeaves = async (empId) => {
  const leaves = await Leaves.find({ empId: empId });
  return leaves;
};

exports.createLeave = async (leaveData) => {
  const newLeave = new Leaves(leaveData);
  return await newLeave.save();
};
