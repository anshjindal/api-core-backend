const Team = require("../models/team");
const Employee = require("../models/employee");

// Create a new team
const createTeam = async (teamData, createdBy) => {
  try {
    const team = new Team({
      ...teamData,
      createdBy,
      updatedBy: createdBy
    });
    return await team.save();
  } catch (error) {
    throw new Error(`Error creating team: ${error.message}`);
  }
};

// Get all teams with optional filters
const getTeams = async (filters = {}) => {
  try {
    const query = { ...filters };
    return await Team.find(query)
      .populate("members.empId", "firstName lastName email")
      .populate("createdBy", "firstName lastName")
      .populate("updatedBy", "firstName lastName");
  } catch (error) {
    throw new Error(`Error fetching teams: ${error.message}`);
  }
};

// Get team by ID
const getTeamById = async (teamId) => {
  try {
    const team = await Team.findOne({ teamId })
      .populate("members.empId", "firstName lastName email")
      .populate("createdBy", "firstName lastName")
      .populate("updatedBy", "firstName lastName");
    
    if (!team) {
      throw new Error("Team not found");
    }
    return team;
  } catch (error) {
    throw new Error(`Error fetching team: ${error.message}`);
  }
};

// Update team
const updateTeam = async (teamId, updateData, updatedBy) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      throw new Error("Team not found");
    }

    Object.assign(team, {
      ...updateData,
      updatedBy,
      updatedAt: Date.now()
    });

    return await team.save();
  } catch (error) {
    throw new Error(`Error updating team: ${error.message}`);
  }
};

// Add member to team
const addTeamMember = async (teamId, memberData, updatedBy) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      throw new Error("Team not found");
    }

    // Check if employee exists
    const employee = await Employee.findOne({ empId: memberData.empId });
    if (!employee) {
      throw new Error("Employee not found");
    }

    // Check if employee is already in team
    const existingMember = team.members.find(m => m.empId === memberData.empId);
    if (existingMember) {
      throw new Error("Employee is already a member of this team");
    }

    team.members.push(memberData);
    team.updatedBy = updatedBy;
    team.updatedAt = Date.now();

    return await team.save();
  } catch (error) {
    throw new Error(`Error adding team member: ${error.message}`);
  }
};

// Remove member from team
const removeTeamMember = async (teamId, empId, updatedBy) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      throw new Error("Team not found");
    }

    team.members = team.members.filter(m => m.empId !== empId);
    team.updatedBy = updatedBy;
    team.updatedAt = Date.now();

    return await team.save();
  } catch (error) {
    throw new Error(`Error removing team member: ${error.message}`);
  }
};

// Update team member status
const updateTeamMemberStatus = async (teamId, empId, status, updatedBy) => {
  try {
    const team = await Team.findOne({ teamId });
    if (!team) {
      throw new Error("Team not found");
    }

    const member = team.members.find(m => m.empId === empId);
    if (!member) {
      throw new Error("Team member not found");
    }

    member.status = status;
    team.updatedBy = updatedBy;
    team.updatedAt = Date.now();

    return await team.save();
  } catch (error) {
    throw new Error(`Error updating team member status: ${error.message}`);
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  addTeamMember,
  removeTeamMember,
  updateTeamMemberStatus
}; 