require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Team = require('../models/team');
const connectToDB = require('../utils/database');

// Sample team data with teamId included
const sampleTeams = [
    {
        teamId: "TEAM00001",
        teamName: "Development Team",
        teamType: "Team Member",
        members: [
            {
                empId: "EMPLOYEE00001",
                role: "Team Lead",
                status: "active"
            }
        ],
        status: "active",
        createdBy: "EMPLOYEE00001"
    },
    {
        teamId: "TEAM00002",
        teamName: "Design Team",
        teamType: "Team Member",
        members: [
            {
                empId: "EMPLOYEE00002",
                role: "Team Lead",
                status: "active"
            }
        ],
        status: "active",
        createdBy: "EMPLOYEE00002"
    }
];

const migrateTeams = async () => {
    try {
        // Connect to MongoDB
        await connectToDB('wouessi_ems');
        console.log('Connected to MongoDB');

        // Clear existing teams
        await Team.deleteMany({});
        console.log('Cleared existing teams');

        // Insert sample teams
        const teams = await Team.insertMany(sampleTeams);
        console.log(`Successfully migrated ${teams.length} teams`);

        // Close the connection
        await mongoose.connection.close();
        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

// Execute migration
migrateTeams(); 