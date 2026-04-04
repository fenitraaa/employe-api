import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeStats,
  getEmployeeSalaryDistribution,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController.js';

const router = express.Router();

router.post('/employees', createEmployee);
router.get('/employees', getAllEmployees);
router.get('/employees/stats', getEmployeeStats);
router.get('/employees/salaryDistribution', getEmployeeSalaryDistribution);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;
