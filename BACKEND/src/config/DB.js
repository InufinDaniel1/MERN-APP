// Import Mongoose, which manages the connection between the app and MongoDB.
import mongoose from "mongoose";

// Export a reusable asynchronous function that connects to the configured database.
export const connectDB = async () => {
  try {
    // Connect using the MongoDB connection string stored in the environment.
    await mongoose.connect(process.env.MONGODB_URI);

    // Confirm in the server logs that the database connection was established.
    console.log("Database connected successfully");
  } catch (error) {
    // Print connection details to help diagnose why MongoDB could not be reached.
    console.error(error);
    // Stop the process with a failure exit code because the API cannot run without its database.
    process.exit(1);
  }
};
