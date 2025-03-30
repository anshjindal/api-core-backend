const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const { authenticateToken } = require("../middlewares/authenticationMiddleware");

// Create a new team
router.post("/", authenticateToken, teamController.createTeam);

// Get all teams
router.get("/", authenticateToken, teamController.getAllTeams);

// Get team by ID
router.get("/:id", authenticateToken, teamController.getTeamById);

// Update team
router.put("/:id", authenticateToken, teamController.updateTeam);

// Delete team
router.delete("/:id", authenticateToken, teamController.deleteTeam);

// Add member to team
router.post("/:teamId/members", authenticateToken, teamController.addMemberToTeam);

// Remove member from team
router.delete("/:teamId/members/:employeeId", authenticateToken, teamController.removeMemberFromTeam);

// Get team members
router.get("/:teamId/members", authenticateToken, teamController.getTeamMembers);

// Update member role in team
router.patch("/:teamId/members/:employeeId/role", authenticateToken, teamController.updateMemberRole);

module.exports = router; 