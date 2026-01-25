import express from "express";

import auth from "./routes/auth.route.js"



const app = express();


// API routes

app.use("/auth", auth)



const PORT = 5001;
const server = app.listen(PORT, () => {
    console.log("Server running on " + PORT)
})

