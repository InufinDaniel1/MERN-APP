import express from "express";
import router from "./routes/router.js";
import { connectDB } from "./config/DB.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

connectDB();

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} and req URL is ${req.url}`);
  next();
});
app.use("/api/notes", router);

app.listen(PORT, () => {
  console.log("server is running at port " + PORT);
});
