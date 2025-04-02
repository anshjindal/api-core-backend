/**
 * Handles common errors and sends appropriate responses
 * @param {Object} res - Express response object
 * @param {Error} error - Error object
 * @param {string} [customMessage] - Optional custom error message
 */
const handleError = (res, error, customMessage = null) => {
    console.error('Error:', error);

    // Handle specific error types
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: customMessage || 'Validation Error',
            errors: Object.values(error.errors).map(err => err.message)
        });
    }

    if (error.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: customMessage || 'Invalid ID format'
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: customMessage || 'Duplicate key error'
        });
    }

    // Default error response
    return res.status(500).json({
        success: false,
        message: customMessage || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
};

module.exports = {
    handleError
}; 
