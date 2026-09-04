import mongoose from "mongoose";

export const dataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/tanstack");
        console.log(`DB Connected`);
    } catch (error) {

    }
}