import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Error in database connecting', error)
    }
}