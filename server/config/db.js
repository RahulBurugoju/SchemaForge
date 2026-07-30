import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const rawUri = process.env.MONGODB_URI;
        if (!rawUri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        const cleanUri = rawUri.replace(/\/+$/, "");
        const connectionInstance = await mongoose.connect(`${cleanUri}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("\n MONGODB connection error : ", error);
        process.exit(1);
    }
};

export default connectDB;