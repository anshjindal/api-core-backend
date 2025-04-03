const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require("../middlewares/authenticationMiddleware");
const { authenticate, authorize } = require("../middlewares/authenticationMiddleware");
const offboardingController = require('../controllers/offboardingController');

// POST endpoint to assign offboarding process
router.post('/assign-process', verifyToken, async (req, res) => {
    const { userId, processId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        user.offboardingProcessId = processId;
        await user.save();

        res.status(200).json({ success: true, message: 'Process assigned successfully.' });
    } catch (error) {
        console.error('Error assigning process:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// DELETE endpoint to delete an offboarding process
router.delete(
    '/delete/:id',
    authenticate,
    authorize('HR', 'ADMIN'),
    offboardingController.deleteOffboardingProcess
);

module.exports = router;
