import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected!!");
    } catch (error) {
        console.error("Error connecting Mongodb!!",error)
    }
}