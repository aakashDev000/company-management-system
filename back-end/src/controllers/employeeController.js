const Employee = require("../models/employeeModel");

// Create an employee
const createEmployee = async (req, res) => {
  try {
    const { name, employeeId, phone, manager, company } = req.body;

    // Validate required fields
    if (!name || !employeeId || !company) {
      return res
        .status(400)
        .json({ message: "Name, employeeId, and company are required" });
    }

    // Check if the employee ID already exists in this company
    const employeeExists = await Employee.findOne({ employeeId, company });

    if (employeeExists) {
      return res
        .status(400)
        .json({ message: "Employee ID already exists in this company" });
    }

    const managerExist = manager ? { manager } : null;

    const employee = await Employee.create({
      name,
      employeeId,
      phone,
      ...managerExist,
      company,
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get employees by company
const getEmployees = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    const employees = await Employee.find({ company: companyId }).populate(
      "manager"
    );

    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, manager } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    // At least one field should be provided to update
    if (!name && !phone && !manager) {
      return res.status(400).json({
        message:
          "At least one field (name, phone, manager) must be provided to update",
      });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (name) employee.name = name;
    if (phone) employee.phone = phone;
    if (manager) employee.manager = manager;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee removed" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get employee hierarchy
const getEmployeeHierarchy = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const employee = await Employee.findById(id).populate("manager");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const subordinates = await Employee.find({ manager: id });

    res.json({
      employee,
      subordinates,
    });
  } catch (error) {
    console.error("Error fetching employee hierarchy:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Search employee by name, employee ID, or phone number
const searchEmployee = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { query } = req.query;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const employees = await Employee.find({
      company: companyId,
      $or: [
        { name: new RegExp(query, "i") },
        { employeeId: new RegExp(query, "i") },
        { phone: new RegExp(query, "i") },
      ],
    }).populate("manager");

    res.json(employees);
  } catch (error) {
    console.error("Error searching employees:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeHierarchy,
  searchEmployee,
};
