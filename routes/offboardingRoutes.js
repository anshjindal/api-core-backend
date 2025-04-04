const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require("../middlewares/authenticationMiddleware");
const { authenticate, authorize } = require("../middlewares/authenticationMiddleware");
const {
    createOffboardingProcess,
    deleteOffboardingProcess
} = require('../controllers/offboardingController');
const { body } = require('express-validator'); 

router.post(
    '/create', 
    authenticate,
    authorize('HR', 'ADMIN'),
    [
        // Validation middleware
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters'),
        
        body('description')
            .notEmpty()
            .withMessage('Description is required')
            .isLength({ min: 10, max: 500 })
            .withMessage('Description must be between 10 and 500 characters'),
        
        body('emailRecipient')
            .isEmail()
            .withMessage('Invalid email address'),
        
        body('checklist')
            .isArray()
            .withMessage('Checklist must be an array')
            .custom((checklist) => {
                if (checklist.length === 0) {
                    throw new Error('Checklist cannot be empty');
                }
                checklist.forEach(item => {
                    if (!item.task) {
                        throw new Error('Each checklist item must have a task');
                    }
                });
                return true;
            })
    ],
    createOffboardingProcess
);

module.exports = router;
// DELETE endpoint to delete an offboarding process
router.delete(
    '/delete/:id',
    authenticate,
    authorize('HR', 'ADMIN'),
    deleteOffboardingProcess
);

module.exports = router;
