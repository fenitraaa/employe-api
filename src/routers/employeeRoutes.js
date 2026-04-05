import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeStats,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);
router.post('/employees', createEmployee);
router.get('/employees', getAllEmployees);
router.get('/employees/stats', getEmployeeStats);
router.put('/employees/:numEmp', updateEmployee);
router.delete('/employees/:numEmp', deleteEmployee);

export default router;
