import mongoose from "mongoose";

const database = process.env.URL;

const connectToDB = async () => {
    try {
        if (!database) {
            throw new Error("MongoDB URL is not configured");
        }

        if (mongoose.connection.readyState === 1) {
            console.log("Using database connection");
            return true;
        }

        await mongoose.connect(database);

        console.log("Connected to DB successfully ✅");
        return true;

    } catch (error) {
        console.error("Database connection error =>", error);
        process.exit(1);
    }
};

export { connectToDB };