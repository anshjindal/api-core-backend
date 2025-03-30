// test.js
const express = require("express");
const app = express();
const authenticationRoutes = require("./routes/authenticationRoutes"); // Import authentication routes

app.use(express.json()); // Add JSON body parsing middleware

app.use("/auth", authenticationRoutes); // Mount authentication routes

app.listen(3000, () => {
    console.log("Server running on port 3000");
});