
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
