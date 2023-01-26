import { set, connect } from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async () => {
    try {
        set("strictQuery", true);
        await connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected Successfully`);
    } catch (error) {}
    };

export const db = connectDB;