import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ DB is connected");
    } catch (error) {
        console.log(`DB is not connected. Err: ${error}`);
        process.exit(1); //if fail to connect to db then app stop running. app get stop listening.
    }
}

export default connectDB;