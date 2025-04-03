const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const newsletterRoute = require("./routes/newsletterRoutes");
const blogRoute = require("./routes/blog");
const contactRoute = require("./routes/contact");
const employeeRoutes = require("./routes/employeeRoutes");

const authRoutes = require("./routes/authenticationRoutes");
const roleRoutes = require("./routes/roleRoutes");

const leaveRequestRoutes = require("./routes/leaveRequestRoutes"); // Import leaveRequestRoutes


const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const leavesRoutes = require("./routes/leaves");

// Use CORS middleware to allow requests from your frontend



app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/newsletter', newsletterRoute);
app.use('/api/blog', blogRoute);
app.use('/api/contact', contactRoute);
app.use("/api/auth", authRoutes);


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
