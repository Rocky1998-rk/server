import mongoose from "mongoose";
import env from "dotenv";

env.config();

export const dbConnect = async ()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected...");

    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
        
    }
};