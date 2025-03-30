const express = require("express");
const router = express.Router();
const Intern = require("../models/intern");

// **Add Dummy Interns to MongoDB** (Run once to populate database)
router.post("/add-dummy", async (req, res) => {
  try {
    const interns = [
      {
        internId: "INTERN0001",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        contactNumber: "+16475551234",
        status: "Paid",
        startDate: "2025-05-01",
        endDate: "2025-08-01",
        department: "Software Engineering",
        capstoneProject: "Employee Management System",
        mentor: "John Smith",
        tasks: ["Develop front-end components", "Integrate APIs", "Fix UI bugs"],
        employmentType: "Full-Time",
        location: "Toronto",
      },
      {
        internId: "INTERN0002",
        firstName: "Bob",
        lastName: "Williams",
        email: "bob.williams@example.com",
        contactNumber: "+16478889999",
        status: "Unpaid",
        startDate: "2025-06-01",
        endDate: "2025-08-31",
        department: "Data Analytics",
        capstoneProject: "Market Trend Analysis Tool",
        mentor: "Emma Brown",
        tasks: ["Analyze market data", "Generate reports", "Develop data visualizations"],
        employmentType: "Part-Time",
        location: "Vancouver",
      },
      {
        internId: "INTERN0003",
        firstName: "Charlie",
        lastName: "Davis",
        email: "charlie.davis@example.com",
        contactNumber: "+16471112222",
        status: "Paid",
        startDate: "2025-05-15",
        endDate: "2025-08-15",
        department: "Web Development",
        capstoneProject: "E-Learning Website Development",
        mentor: "Michael Lee",
        tasks: ["Create responsive UI", "Work on authentication system", "Optimize website performance"],
        employmentType: "Full-Time",
        location: "Montreal",
      }
    ];

    await Intern.insertMany(interns);
    res.status(201).json({ message: "Interns added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding interns", details: error.message });
  }
});

// **Fetch All Interns from MongoDB**
router.get("/", async (req, res) => {
  try {
    const interns = await Intern.find();
    res.json(interns);
  } catch (error) {
    res.status(500).json({ error: "Error fetching interns", details: error.message });
  }
});

module.exports = router;
