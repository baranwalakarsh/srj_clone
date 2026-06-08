import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is required in environment variables");
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  logger.info("MongoDB connected successfully");
};

export default connectDB;
