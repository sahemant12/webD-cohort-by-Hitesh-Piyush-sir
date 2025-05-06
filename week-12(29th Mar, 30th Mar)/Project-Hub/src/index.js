import app from "./app.js"
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 8080;

//connectDB
connectDB()
    .then(() => {
        app.listen(port, ()=>{
            console.log(`app is listening on port: ${port}`);
        })
    })
    .catch((err) => {
        console.error("Mongodb connection error", err);
        process.exit(1);
    }); 