import express from "express";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import 'dotenv/config';
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/hello", (req, res)=>{
    res.send("Hello")
})
app.use("/api/v1/healthcheck", healthcheckRouter);


export default app;