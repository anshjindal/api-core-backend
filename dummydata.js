require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
const Timesheet = require('./models/timesheetModel'); // Adjust path to your model if necessary

// Update connection string for replica set
const uri = 'mongodb://127.0.0.1:27017/kc_garments?replicaSet=rs0';

console.log('Attempting to connect to MongoDB replica set...');

// Add replica set options to the connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  replicaSet: 'rs0'
})
  .then(async () => {
    console.log('✅ Successfully connected to MongoDB replica set');
    try {
      // Clear existing data
      const deleteResult = await Timesheet.deleteMany({});
      console.log('Cleared existing data:', deleteResult);

      const dummyData = [
        {
          userId: "EMP001",
          date: new Date("2025-03-26T23:03:47.915+00:00"),
          hours: 8,
          description: "Development work",
          projectId: "PROJ001",
          status: "pending",
          createdAt: new Date("2025-03-26T23:03:47.919+00:00"),
          updatedAt: new Date("2025-03-26T23:03:47.919+00:00")
        },
        {
          userId: "EMP002",
          date: new Date("2025-03-26T23:03:47.915+00:00"),
          hours: 6,
          description: "Testing",
          projectId: "PROJ002",
          status: "approved",
          createdAt: new Date("2025-03-26T23:03:47.920+00:00"),
          updatedAt: new Date("2025-03-26T23:03:47.920+00:00")
        },
        {
          userId: "EMP003",
          date: new Date("2025-03-26T23:03:47.915+00:00"),
          hours: 7,
          description: "Bug fixes and code review",
          projectId: "PROJ003",
          status: "pending",
          createdAt: new Date("2025-03-26T23:03:47.920+00:00"),
          updatedAt: new Date("2025-03-26T23:03:47.920+00:00")
        }
      ];

      // Insert the dummy data
      console.log('Attempting to insert dummy data...');
      const result = await Timesheet.insertMany(dummyData);
      console.log('✅ Successfully inserted data:', JSON.stringify(result, null, 2));

      // Verify the data exists
      const count = await Timesheet.countDocuments();
      console.log(`Total documents in collection: ${count}`);

      // Find and display all documents
      const allDocs = await Timesheet.find({});
      console.log('All documents:', JSON.stringify(allDocs, null, 2));

    } catch (error) {
      console.error('Error during data operations:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
    } finally {
      // Close the connection
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    }
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    console.error('Connection error details:', JSON.stringify(err, null, 2));
    process.exit(1);
  });
