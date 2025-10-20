import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config(); //it loads all the env variable of .env file into "process.env"

const app = express();

app.use(cors({ //It controls which external websites (origins) can talk to your backend server.
    origin: process.env.BASE_URL,
    credentials:true, //Allows the browser to send cookies or authentication info with the request.
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //Specifies which HTTP request methods are allowed from the frontend (GET, POST, PUT).
    allowedHeaders: ["Content-Type", "Authorization"] //Specifies which HTTP headers the frontend is allowed to send in requests. Here, it allows Content-Type (like JSON data) and Authorization (like tokens).
}));
app.use(express.json()); //http only send text. So when the client send the data(it is just plain text) AND express.json() convert/processes this data into Js object so that the server can work with it.
//parse incoming json payloads from POST, PUT, PATCH req and makes them available in req.body.

app.use(express.urlencoded({extended:true})); //parse form data and makes them available in req.body. //Can parse complex nested objects and arrays.
app.use(cookieParser()); // is middleware that parses HTTP cookies from incoming requests and makes them easily accessible in your Express application.

const port = process.env.PORT || 8080;

app.get("/",(req, res)=>{
    // res.send("Hello! Ji"); //Sends any type of data (string, object, array, buffer), Automatically sets Content-Type based on the data type, Calls res.end() internally.
    res.end("Hello! Ji"); //Only sends raw data (string, buffer, etc.), Does not automatically set Content-Type (default is text/plain), Cannot send objects or JSON directly.
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