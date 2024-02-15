import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`The Database is Connected at ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};
