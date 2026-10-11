// Import Express to create and configure the HTTP server application.
import express from "express";
// Import the router that defines the notes API endpoints.
import router from "./routes/router.js";
// Import the function that opens the MongoDB connection.
import { connectDB } from "./config/DB.js";
// Import dotenv so local environment variables can be loaded from a .env file.
import dotenv from "dotenv";

// Read .env values into process.env before accessing settings such as PORT.
dotenv.config();
// Read the port configured in the environment for this server to listen on.
const PORT = process.env.PORT;

// Start connecting to MongoDB so the API can persist and retrieve notes.
connectDB();

// Create the Express application that will receive incoming HTTP requests.
const app = express();

// Parse incoming JSON request bodies and expose the parsed values on req.body.
app.use(express.json());
// Log each incoming request's HTTP method and URL, then continue to later middleware.
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} and req URL is ${req.url}`);
  next();
});
// Mount all note endpoints under the shared /api/notes URL prefix.
app.use("/api/notes", router);

// Start listening for HTTP requests and print the local address once ready.
app.listen(PORT, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});
