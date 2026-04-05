import Employee from '../models/employeeSchema.js';

const parseNumEmp = (value) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
};

export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee,
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    console.log('Error creating employee:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getAllEmployees = async (_req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json({
      success: true,
      message: 'Employees retrieved successfully',
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
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
        success: true,
        message: 'Employee salary stats retrieved successfully',
        data: {
          totalSalary: 0,
          minSalary: 0,
          maxSalary: 0,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Employee salary stats retrieved successfully',
      data: stats[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const parsedNumEmp = parseNumEmp(req.params.numEmp);

    if (parsedNumEmp === null) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee number',
      });
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      { numEmp: parsedNumEmp },
      req.body,
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Error updating employee:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const parsedNumEmp = parseNumEmp(req.params.numEmp);

    if (parsedNumEmp === null) {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee number',
      });
    }

    const deletedEmployee = await Employee.findOneAndDelete({ numEmp: parsedNumEmp });

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: deletedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
