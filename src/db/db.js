import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dburl = process.env.MONGODB_URL;


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(dburl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("DB connection error -> ", error);
        process.exit(1);
    }
}

export default connectDB;