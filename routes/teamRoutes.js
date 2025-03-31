const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const verifySession = require("../middlewares/authenticationMiddleware");

// import multer
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Documents route
router.post(
  "/:teamId/members/:empId/documents",
  verifySession,
  upload.single("file"),
  teamController.uploadMemberDocument
);

router.get(
  "/:teamId/members/:empId/documents",
  verifySession,
  teamController.getMemberDocuments
);

// Create a new team
router.post("/", verifySession, teamController.createTeam);

// Get all teams
router.get("/", verifySession, teamController.getAllTeams);

// Get single team
router.get("/:teamId", verifySession, teamController.getTeamById);

// Update the entire team
router.put("/:teamId", verifySession, teamController.updateTeam);

// Add member to a team
router.post("/:teamId/members", verifySession, teamController.addMemberToTeam);

// Update a specific member (like role, status) in a team
router.put("/:teamId/members/:empId", verifySession, teamController.updateTeamMember);

// Remove member
router.delete("/:teamId/members/:empId", verifySession, teamController.removeMemberFromTeam);

module.exports = router;
