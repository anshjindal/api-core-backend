const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); 
const testTokenRoute = require('./routes/testToken');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser()); //Required to access req.cookies.refreshToken

// Middleware
app.use('/api/test', testTokenRoute);
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Connect to Database
connectDB();

const authRoutes = require('./routes/authenticationRoutes'); // 👈 Make sure this file exists
app.use('/api/auth', authRoutes);

// Routes
const offboardingRoutes = require('./routes/offboardingRoutes');
app.use('/api/offboarding', offboardingRoutes);

app._router.stack
  .filter(r => r.route && r.route.path)
  .forEach(r => {
    const methods = Object.keys(r.route.methods).join(', ').toUpperCase();
    console.log(`[${methods}] ${r.route.path}`);
  });


// Start server
const PORT = process.env.PORT || 5000;
app.use((err, req, res, next) => {
    console.error("Global error:", err.stack || err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});