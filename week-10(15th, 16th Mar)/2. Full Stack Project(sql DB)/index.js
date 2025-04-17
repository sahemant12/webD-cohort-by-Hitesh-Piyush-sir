import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from "express";
import cors from "cors";
import userRouter from './routes/auth.routes.js';

const app = express();

const port = process.env.PORT || 8080;

app.use(cors({
    origin: process.env.BASE_URL,
    credentials:true,
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("Am I working?");
})

app.use("/api/v1/user", userRouter);

app.listen(port, ()=>{
    console.log(`app is listening on the port: ${port}`);
})