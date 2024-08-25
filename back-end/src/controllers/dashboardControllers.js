const Company = require("../models/companyModel");
const Employee = require("../models/employeeModel");

// Get company and employee stats
const getCompanyEmployeeStats = async (req, res) => {
  try {
    // Get all companies
    const companies = await Company.find();

    // For each company, get the count of employees
    const stats = await Promise.all(
      companies.map(async (company) => {
        const employeeCount = await Employee.countDocuments({
          company: company._id,
        });
        return {
          companyName: company.name,
          companyCode: company.code,
          employeeCount,
        };
      })
    );

    res.json(stats);
  } catch (error) {
    console.error("Error fetching company and employee stats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTotalCompanies = async (req, res) => {
  try {
    const totalCompanies = await Company.countDocuments();
    res.json({ totalCompanies });
  } catch (error) {
    console.error("Error fetching total companies:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTotalEmployees = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    res.json({ totalEmployees });
  } catch (error) {
    console.error("Error fetching total employees:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTotalEmployees,
  getTotalCompanies,
  getCompanyEmployeeStats,
};
