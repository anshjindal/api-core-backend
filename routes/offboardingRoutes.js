// Delete offboarding process route
router.delete(
    '/delete/:id',
    authenticate,
    authorize('HR', 'ADMIN'),
    offboardingController.deleteOffboardingProcess
);

module.exports = router;