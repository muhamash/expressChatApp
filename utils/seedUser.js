const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = require( "../models/users" );


// MongoDB connection URI
const dbUri = "mongodb://localhost:27017/expressChat"; 

async function seedUsers() {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected!");

        const hashedPassword = await bcrypt.hash("password123", 10);

        const sampleUsers = [
            {
                name: "John Doe",
                email: "john@example.com",
                mobile: "01710000001",
                password: hashedPassword,
                role: "admin",
            },
            {
                name: "Jane Smith",
                email: "jane@example.com",
                mobile: "01710000002",
                password: hashedPassword,
                role: "user",
            },
            {
                name: "Alice Johnson",
                email: "alice@example.com",
                mobile: "01710000003",
                password: hashedPassword,
                role: "user",
            },
        ];

        await Users.insertMany(sampleUsers);
        console.log("Sample users inserted successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding users:", error);
        process.exit(1);
    }
}

seedUsers();