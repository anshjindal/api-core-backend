const path = require("path");
const TeamService = require("../service/teamService");
const { uploadFile } = require("../middlewares/fileStorageMiddlware"); 

// Create a new team
const createTeam = async (req, res) => {
  try {
    const teamData = req.body;
    const team = await TeamService.createTeam(teamData, req.user.empId);
    return res.status(201).json({
      success: true,
      data: team
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamService.getTeams();
    console.log("Fetched teams:", JSON.stringify(teams, null, 2));
    return res.status(200).json({
      success: true,
      teams
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get team by ID
const getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await TeamService.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    return res.status(200).json({ success: true, data: team });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update an entire team
const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const updateData = req.body;
    const team = await TeamService.updateTeam(teamId, updateData, req.user.empId);

    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    return res.status(200).json({ success: true, data: team });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Add member to team
const addMemberToTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { empId, role, status } = req.body;

    const team = await TeamService.addTeamMember(teamId, { empId, role, status }, req.user.empId);
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    return res.status(200).json({ success: true, data: team });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a single member in the team
const updateTeamMember = async (req, res) => {
  try {
    const { teamId, empId } = req.params;
    const { role, status } = req.body;

    const team = await TeamService.updateTeamMemberStatus(
      teamId,
      empId,
      { role, status },
      req.user.empId
    );
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    return res.status(200).json({ success: true, data: team });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Remove member
const removeMemberFromTeam = async (req, res) => {
  try {
    const { teamId, empId } = req.params;
    const team = await TeamService.removeTeamMember(teamId, empId, req.user.empId);

    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    return res.status(200).json({ success: true, data: team });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Upload a single file for a specific member, then call 'TeamService.saveDocumentMetadata' to record it in the DB
const uploadMemberDocument = async (req, res) => {
  try {
    const { teamId, empId } = req.params;
    const file = req.file; // from multer.single("file")
    console.log("Uploading file for", empId, "in team", teamId);

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const basePath = process.env.FILE_STORAGE_BASE_PATH || "/mnt/data";
    const destinationPath = path.join(basePath, "teams", teamId, empId);

    // write from buffer to disk
    const savedFilePath = await uploadFile(file, destinationPath);

    // store metadata in the DB
    const updatedTeam = await TeamService.saveDocumentMetadata(
      teamId,
      empId,
      savedFilePath,
      file,
      req.user.empId
    );
    console.log("Document metadata saved:", updatedTeam);

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team or member not found" });
    }

    return res.status(200).json({ success: true, data: updatedTeam });
  } catch (error) {
    console.error("Error uploading member document:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getMemberDocuments = async (req, res) => {
  try {
    const { teamId, empId } = req.params;
    const team = await Team.findOne({ teamId });

    if (!team) return res.status(404).json({ success: false, message: "Team not found" });

    const member = team.members.find((m) => m.empId === empId);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });

    return res.status(200).json({ success: true, documents: member.documents || [] });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  addMemberToTeam,
  updateTeamMember,
  removeMemberFromTeam,
  uploadMemberDocument,
  getMemberDocuments
};