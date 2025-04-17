import mongoose from "mongoose";
import "dotenv/config";

//export a fn that connects DB.
const db = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB is connected");           
    })
    .catch((err)=>{
        console.log(`DB not connected. Err: ${err}`);            
    });
};
export {db};
