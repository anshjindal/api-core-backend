exports.getEmploymentStatus = (req, res) => {
    return res.status(200).json({
      message: "Employment status retrieved",
      data: {
        effectiveDate: "2024-03-26",
        status: "Active",
      },
    });
  };
  