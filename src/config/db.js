import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is not defined in environment variables');
    } else {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`MongoDB connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
