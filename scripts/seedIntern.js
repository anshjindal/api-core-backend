const mongoose = require("mongoose");
const User = require("../models/users"); 

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/wouessi_ems", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const interns = [
  {
    employeeId: "INT001",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Intern",
    internDetails: {
      type: "Paid",
      university: "XYZ University",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-08-31"),
    },
  },
  {
    employeeId: "INT002",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Intern",
    internDetails: {
      type: "Unpaid",
      university: "ABC University",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-09-30"),
    },
  },
  {
    employeeId: "INT003",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Intern",
    internDetails: {
      type: "Paid",
      university: "PQR University",
      startDate: new Date("2024-07-01"),
      endDate: new Date("2024-10-31"),
    },
  },
];

async function seedDB() {
  try {
    await User.insertMany(interns);
    console.log("Dummy intern data inserted successfully!");
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
