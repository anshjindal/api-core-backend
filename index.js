const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const newsletterRoute = require("./routes/newsletterRoutes");
const blogRoute = require("./routes/blog");
const contactRoute = require("./routes/contact");
const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const designationRoutes = require("./routes/designationRoutes");
const employmentStatusRoutes = require("./routes/employmentStatusRoutes");

const authRoutes = require("./routes/authenticationRoutes");
const roleRoutes = require("./routes/roleRoutes");

require("dotenv").config({ path: "./.env" });

const connectToDB = require("./utils/database");
const app = express();
//new addon requires
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const leavesRoutes = require("./routes/leaves");
const jobInfoRoutes = require("./routes/jobInfoRoutes");

const allowedOrigins = [
  process.env.WOUESSI_FRONTEND_URL,
  "http://localhost:3000",
  "https://www.wouessi.com/en",
  "https://www.wouessi.com",
  "https://www.wouessi.ca/en/",
  "https://www.wouessi.ca",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200); // Allow preflight requests
  } else {
    next();
  }
});

// Middleware
app.use(express.json());
const errorHandler = require("./middlewares/errorHandler");

// Serve files in the uploads folder as static content
const uploadDirectory = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadDirectory));

// Add the newsletter route
app.use("/api/newsletter", newsletterRoute);
app.use("/api/blog", blogRoute);
app.use("/api/contact", contactRoute);

//new
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Employee Routes
app.use("/api/employee", employeeRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/designation", designationRoutes);
app.use("/api/leaves", leavesRoutes);
app.use("/api/job-info", jobInfoRoutes);
app.use("/api/employment-status", employmentStatusRoutes);

const dbName = "Wouessi";

connectToDB(dbName)
  .then(() => {
    console.log(`Successfully connected to the database: ${dbName}`);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
    process.exit(1); // Exit the process if the connection fails
  });

// Define your routes
app.get("/", (req, res) => {
  res.send("Welcome to Wouessi Back Office");
});

app.get("/data", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
