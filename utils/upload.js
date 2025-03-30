const fs = require("fs").promises;
const path = require("path");

// Utility function to save file to disk
const saveFile = async (file, empId) => {
  try {
    const destinationPath = path.join(__dirname, "..", "uploads");
    const fileExtension = path.extname(file.originalname);
    const fileName = `${empId}${fileExtension}`;
    const filePath = path.join(destinationPath, fileName);
    await fs.mkdir(destinationPath, { recursive: true }); // Ensure the directory exists
    await fs.writeFile(filePath, file.buffer);// Ensure the directory exists
    return filePath; // Return the file path where the file is saved
  } catch (err) {
    throw err;
  }
};

module.exports = { saveFile };