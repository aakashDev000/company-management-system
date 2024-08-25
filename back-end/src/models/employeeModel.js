const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    employeeId: { type: String, required: true },
    phone: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }, // Reference to another employee
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    }, // Reference to a company
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
