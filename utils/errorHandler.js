function handleError(res, error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
  
  module.exports = {
    handleError,
  };