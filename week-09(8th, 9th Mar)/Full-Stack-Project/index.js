import express from "express";
import 'dotenv/config';
import cors from "cors";
import { db } from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors({
    origin: process.env.BASE_URL,
    credentials:true,
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); //Accept json data from frontend/client
app.use(express.urlencoded({extended:true})); //when accept data from url: %20(space), encode the url data


const port = process.env.PORT || 8080;

app.get("/",(req, res)=>{
    res.send("Hello!");
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