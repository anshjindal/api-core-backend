const OffboardingProcess = require('../models/OffboardingProcess');
const { validationResult } = require('express-validator');


exports.createOffboardingProcess = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Destructure request body
        const { 
            title, 
            description, 
            checklist, 
            emailRecipient 
        } = req.body;

        // Create new offboarding process
        const newOffboardingProcess = new OffboardingProcess({
            title,
            description,
            checklist,
            emailRecipient,
            createdBy: req.user._id, // Assuming authenticated user
            status: 'DRAFT'
        });

        // Save the process
        const savedProcess = await newOffboardingProcess.save();

        // Respond with success
        res.status(201).json({
            success: true,
            message: 'Offboarding process created successfully',
            data: savedProcess
        });
    } catch (error) {
        console.error('Error creating offboarding process:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create offboarding process',
            error: error.message
        });
    }
};

exports.deleteOffboardingProcess = async (req, res) => {
    try {

        // Get the process ID from request parameters
        const { id } = req.params;

        // Check if the offboarding process exists
        const process = await OffboardingProcess.findById(id);
        if (!process) {
            return res.status(404).json({
                success: false,
                message: 'Offboarding process not found'
            });
        }

        // Delete the offboarding process
        await OffboardingProcess.findByIdAndDelete(id);

        // Respond with success
        res.status(200).json({
            success: true,
            message: 'Offboarding process deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting offboarding process:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete offboarding process',
            error: error.message
        });
    }
};
