const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser"); // If using CSV
const User = require("../models/users");
const Team = require("../models/team");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/wouessi_ems", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("Connection error:", err));

// Load JSON or CSV Data
const loadData = (filePath, format = "json") => {
  return new Promise((resolve, reject) => {
    if (format === "json") {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    } else if (format === "csv") {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    } else {
      reject(new Error("Unsupported format"));
    }
  });
};

// Insert Teams into MongoDB
const insertTeams = async (teams) => {
  try {
    await Team.insertMany(teams);
    console.log("Teams inserted successfully");
  } catch (error) {
    console.error("Error inserting teams:", error);
  }
};

// Insert Users into MongoDB
const insertUsers = async (users) => {
  try {
    await User.insertMany(users);
    console.log("Users inserted successfully");
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

// Run Migration
const runMigration = async () => {
  try {
    await new Promise((resolve) => db.once("open", resolve)); // Ensure connection is open

    console.log("MongoDB connection is open. Proceeding with migration...");

    const teams = await loadData("./teams.json"); // or "teams.csv"
    const users = await loadData("./users.json");

    console.log("Deleting existing teams and users...");
    await Team.deleteMany({});
    await User.deleteMany({});

    console.log("Inserting new teams and users...");
    await insertTeams(teams);
    await insertUsers(users);

    // Test queries
    const teamCount = await Team.countDocuments();
    const userCount = await User.countDocuments();
    console.log(`Migration complete: ${teamCount} teams, ${userCount} users added.`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Migration failed:", error);
    mongoose.connection.close();
  }
};

runMigration();
