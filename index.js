const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const newsletterRoute = require("./routes/newsletterRoutes");
const blogRoute = require("./routes/blog");
const contactRoute = require("./routes/contact");
const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const designationRoutes = require("./routes/designationRoutes");

const authRoutes = require("./routes/authenticationRoutes");
const roleRoutes = require("./routes/roleRoutes");

const multer = require("multer");

require("dotenv").config({ path: "./.env" });

//new addon requires
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const leavesRoutes = require("./routes/leaves");

const connectToDB = require("./utils/database");
const app = express();

// Use CORS middleware to allow requests from your frontend
app.use(
  cors({
    origin: [
      process.env.WOUESSI_FRONTEND_URL,
      "http://localhost:3000",
      "https://dev.wouessi.com/en",
      "https://dev.wouessi.com",
      "https://www.wouessi.com/en",
      "https://www.wouessi.com",
      "https://www.wouessi.ca/en/",
      "https://www.wouessi.ca",
    ], // Dynamically set the allowed CORS origin
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());

app.use(cookieParser());

// Routes
app.use("/api/newsletter", newsletterRoute);
app.use("/api/blog", blogRoute);
app.use("/api/contact", contactRoute);
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/designation", designationRoutes);
app.use("/api/leaves", leavesRoutes);

const dbName = "Wouessi";

connectToDB(dbName)
  .then(() => {
    console.log(`Successfully connected to the database: ${dbName}`);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
    process.exit(1);
  });

// Basic routes
app.get("/", (req, res) => {
  res.send("Welcome to Wouessi Back Office");
});

app.get("/data", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
