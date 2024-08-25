import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onSubmit, employee }) => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [phone, setPhone] = useState("");
  const [manager, setManager] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmployeeId(employee.employeeId);
      setPhone(employee.phone);
      setManager(employee.manager);
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, employeeId, phone, manager });
    setName("");
    setEmployeeId("");
    setPhone("");
    setManager("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Employee Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Employee ID</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          Reporting Manager
        </label>
        <input
          type="text"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        {employee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
