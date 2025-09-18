import mongoose from "mongoose";

const url = process.env.MONGO_CONNECTION;

export const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1);
  }
};
