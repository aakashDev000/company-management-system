const Company = require("../models/companyModel");

// Create a company
const createCompany = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "Name and code are required" });
    }

    const companyExists = await Company.findOne({ code });

    if (companyExists) {
      return res.status(400).json({ message: "Company code already exists" });
    }

    const company = await Company.create({ name, code });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all companies
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;

    if (!name && !code) {
      return res.status(400).json({ message: "Name or code must be provided" });
    }

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (name) company.name = name;
    if (code) company.code = code;

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Company ID is required" });
    }
    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createCompany, getCompanies, updateCompany, deleteCompany };
