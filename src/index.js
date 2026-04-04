import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routers/authRoutes.js';
import employeeRoutes from './routers/employeeRoutes.js';
import authenticateToken from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', authenticateToken, employeeRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
