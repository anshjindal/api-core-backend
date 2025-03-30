const TeamService = require('../service/teamService');
const { handleError } = require('../utils/errorHandler');

// Create a new team
const createTeam = async (req, res) => {
    try {
        const teamData = req.body;
        const team = await TeamService.createTeam(teamData, req.user.empId);
        res.status(201).json({
            success: true,
            data: team
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Get all teams
const getAllTeams = async (req, res) => {
    try {
        const teams = await TeamService.getTeams(req.query);
        res.status(200).json({
            success: true,
            data: teams
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Get team by ID
const getTeamById = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await TeamService.getTeamById(id);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }
        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Update team
const updateTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const team = await TeamService.updateTeam(id, updateData, req.user.empId);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }
        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete team
const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await TeamService.deleteTeam(id);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Team deleted successfully'
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Add member to team
const addMemberToTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { employeeId, role } = req.body;
        const team = await TeamService.addTeamMember(teamId, { employeeId, role }, req.user.empId);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }
        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Remove member from team
const removeMemberFromTeam = async (req, res) => {
    try {
        const { teamId, employeeId } = req.params;
        const team = await TeamService.removeTeamMember(teamId, employeeId, req.user.empId);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }
        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Get team members
const getTeamMembers = async (req, res) => {
    try {
        const { teamId } = req.params;
        const members = await TeamService.getTeamMembers(teamId);
        if (!members) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }
        res.status(200).json({
            success: true,
            data: members
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Update member role in team
const updateMemberRole = async (req, res) => {
    try {
        const { teamId, employeeId } = req.params;
        const { role } = req.body;
        const team = await TeamService.updateTeamMemberStatus(teamId, employeeId, role, req.user.empId);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }
        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    addMemberToTeam,
    removeMemberFromTeam,
    getTeamMembers,
    updateMemberRole
}; 