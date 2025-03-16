const fs = require("fs");
const path = require("path");
require("dotenv").config();

const FILE_PERMISSION = parseInt(process.env.FILE_PERMISSION, 8);

exports.uploadFile = async (file, destinationPath) => {
  return new Promise((resolve, reject) => {
    try {
      if (!file || !destinationPath) return reject(new Error("File and Destination Path are required"));

      // Ensure the directory exists
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
        fs.chmodSync(destinationPath, FILE_PERMISSION);
      }

      // Define final file path using the original filename
      const fileExt = path.extname(file.originalname);
      const filePath = path.join(destinationPath, `${file.fieldname}${fileExt}`);


      // **Write file from memory buffer to disk**
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) return reject(err);
        resolve(filePath); // ✅ Return saved file path
      });
    } catch (error) {
      reject(error);
    }
  });
};
