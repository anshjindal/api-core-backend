const Team = require("../models/team");
const Employee = require("../models/employee");
const path = require("path");

/**
 * Create a new team.
 * @param {Object} teamData  The incoming team fields (like teamName, etc.)
 * @param {String} createdBy The empId of the user creating the team
 * @returns The newly created team document
 */
const createTeam = async (teamData, createdBy) => {
  try {
    const team = new Team({
      ...teamData,
      createdBy,
      updatedBy: createdBy,
    });
    return await team.save();
  } catch (error) {
    throw new Error(`Error creating team: ${error.message}`);
  }
};

// Get all teams via aggregation, to attach an employee's fullName for each member.
const getTeams = async () => {
  try {
    const teams = await Team.aggregate([
      // 1) Decompose the members array
      { $unwind: "$members" },
      {
        // 2) Lookup employees by matching "members.empId" => "employees.empId"
        $lookup: {
          from: "employees",
          localField: "members.empId",
          foreignField: "empId",
          as: "employeeInfo"
        }
      },
      {
        // 3) We may or may not have a matched employee doc
        $unwind: {
          path: "$employeeInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          "members.fullName": {
            $cond: {
              if: { $and: ["$employeeInfo.firstName", "$employeeInfo.lastName"] },
              then: {
                $concat: ["$employeeInfo.firstName", " ", "$employeeInfo.lastName"]
              },
              else: "$members.empId"
            }
          }
        }
      },
      {
        // 4) Group everything back into a single doc per Team
        $group: {
          _id: "$_id",
          teamId: { $first: "$teamId" },
          teamName: { $first: "$teamName" },
          teamType: { $first: "$teamType" },
          members: {
            $push: {
              empId: "$members.empId",
              role: "$members.role",
              status: "$members.status",
              documents: "$members.documents",
              fullName: "$members.fullName"
            }
          }
        }
      }
    ]);

    return teams;
  } catch (error) {
    console.error("Error in getTeams aggregate:", error);
    throw new Error(`Error fetching teams: ${error.message}`);
  }
};

// Get team by ID
const getTeamById = async (teamId) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      return null;
    }
    return team;
  } catch (error) {
    throw new Error(`Error fetching team: ${error.message}`);
  }
};

// Update an entire team doc.
const updateTeam = async (teamId, updateData, updatedBy) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      return null;
    }

    // Merge in new fields
    Object.assign(team, {
      ...updateData,
      updatedBy,
      updatedAt: Date.now(),
    });

    return await team.save();
  } catch (error) {
    throw new Error(`Error updating team: ${error.message}`);
  }
};

// Add a new member to a team by string-based empId. Also checks if employee record exists in employees table and the member is already in the team.
const addTeamMember = async (teamId, memberData, updatedBy) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      return null; // Team not found
    }

    // Check if employee with that empId exists
    const employee = await Employee.findOne({ empId: memberData.empId });
    if (!employee) {
      throw new Error(`Employee not found: ${memberData.empId}`);
    }

    // Check if that empId is already in the team
    const existingMember = team.members.find((m) => m.empId === memberData.empId);
    if (existingMember) {
      throw new Error(`Employee ${memberData.empId} is already a member of this team`);
    }

    // Otherwise, add them
    team.members.push({
      empId: memberData.empId,
      role: memberData.role,
      status: memberData.status || "active",
    });

    team.updatedBy = updatedBy;
    team.updatedAt = Date.now();

    return await team.save();
  } catch (error) {
    throw new Error(`Error adding team member: ${error.message}`);
  }
};

// Update a single member's role or status in the given team doc. 
const updateTeamMemberStatus = async (teamId, empId, updates, updatedBy) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      return null;
    }

    // find the existing member
    const member = team.members.find((m) => m.empId === empId);
    if (!member) {
      throw new Error(`Team member not found: ${empId}`);
    }

    // only update fields we intend to allow
    if (updates.role) {
      member.role = updates.role;
    }
    if (updates.status) {
      member.status = updates.status;
    }

    team.updatedBy = updatedBy;
    team.updatedAt = Date.now();

    return await team.save();
  } catch (error) {
    throw new Error(`Error updating team member status: ${error.message}`);
  }
};

// Remove a member from the team doc by empId. 
const removeTeamMember = async (teamId, empId, updatedBy) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      return null;
    }

    team.members = team.members.filter((m) => m.empId !== empId);
    team.updatedBy = updatedBy;
    team.updatedAt = Date.now();

    return await team.save();
  } catch (error) {
    throw new Error(`Error removing team member: ${error.message}`);
  }
};

// Saves the doc metadata for a specific member after we physically wrote the file.
const saveDocumentMetadata = async (teamId, empId, savedFilePath, file, updatedBy) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      return null;
    }
    const member = team.members.find((m) => m.empId === empId);
    if (!member) {
      return null;
    }

    // build a doc entry
    const docEntry = {
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      uploadDate: new Date()
      // any other fields you want
    };
    // push to the 'documents' array in that member
    if (!member.documents) {
      member.documents = [];
    }
    member.documents.push(docEntry);

    team.updatedBy = updatedBy;
    team.updatedAt = Date.now();

    await team.save();
    return team;
  } catch (error) {
    throw new Error(`Error saving document metadata: ${error.message}`);
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  addTeamMember,
  updateTeamMemberStatus,
  removeTeamMember,
  saveDocumentMetadata
};
