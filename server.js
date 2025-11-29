import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import contactRoutes from "./server/routes/contactRoutes.js";
import projectRoutes from "./server/routes/projectRoutes.js";
import educationRoutes from "./server/routes/educationRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import authRoutes from "./server/routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", educationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info("Server started on port %s.", config.port);
});