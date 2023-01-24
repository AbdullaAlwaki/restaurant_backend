const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected Successfully`);
    } catch (error) {}
    };

exports.db = connectDB;