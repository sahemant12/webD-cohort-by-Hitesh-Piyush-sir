import express from "express";
import 'dotenv/config';
import cors from "cors";
import { db } from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.BASE_URL,
    credentials:true,
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); //parse incoming json payloads from POST, PUT, PATCH req and makes them available in req.body.
app.use(express.urlencoded({extended:true})); //parse form data and makes them available in req.body.
app.use(cookieParser());

const port = process.env.PORT || 8080;

app.get("/",(req, res)=>{
    // res.send("Hello! Ji"); //Sends any type of data (string, object, array, buffer), Automatically sets Content-Type based on the data type, Calls res.end() internally.
    res.end("Hey Hemant"); //Only sends raw data (string, buffer, etc.), Does not automatically set Content-Type (default is text/plain), Cannot send objects or JSON directly.
});
app.get("/hemant", (req, res)=>{
    res.send("Hemant Sah!");
});


//connect to db
db();

//user routes
app.use("/api/v1/users", userRoutes);

app.listen(port, ()=>{
    console.log(`app is listening on PORT: ${port}`); 
});