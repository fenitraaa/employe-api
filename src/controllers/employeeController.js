import mongoose from 'mongoose';
import Employee from '../models/employeeSchema.js';

export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    if (error.name === 'ValidationError' || error.code === 11000) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllEmployees = async (_req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEmployeeStats = async (_req, res) => {
  try {
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: '$salaire' },
          minSalary: { $min: '$salaire' },
          maxSalary: { $max: '$salaire' },
        },
      },
      {
        $project: {
          _id: 0,
          totalSalary: 1,
          minSalary: 1,
          maxSalary: 1,
        },
      },
    ]);

    if (stats.length === 0) {
      return res.status(200).json({
        totalSalary: 0,
        minSalary: 0,
        maxSalary: 0,
      });
    }

    return res.status(200).json(stats[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEmployeeSalaryDistribution = async (_req, res) => {
  try {
    const salaryDistribution = await Employee.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$salaire' },
          min: { $min: '$salaire' },
          max: { $max: '$salaire' },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          min: 1,
          max: 1,
        },
      },
    ]);

    if (salaryDistribution.length === 0) {
      return res.status(200).json({
        total: 0,
        min: 0,
        max: 0,
      });
    }

    return res.status(200).json(salaryDistribution[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid employee id' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid employee id' });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
