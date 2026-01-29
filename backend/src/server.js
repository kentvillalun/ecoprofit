import express from "express";
import { config } from "dotenv"
import "dotenv/config";
import { connectDB, disconnectDB } from './config/db.js'
import cors from "cors";


import auth from "./routes/auth.route.js"

config();
connectDB();

const app = express();


// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // keep this only if you use cookies/sessions
}));

app.use("/auth", auth)




const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log("Server running on " + PORT)
})


// Handle unhandled promise rejections (e.g., databse connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions 
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exceptions:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown 
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});