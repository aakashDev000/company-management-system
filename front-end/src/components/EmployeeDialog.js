import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";

const EmployeeDialog = ({ isOpen, onClose, onSubmit, employee }) => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [phone, setPhone] = useState("");
  const [manager, setManager] = useState("");

  const { employees } = useSelector((state) => state.employee);

  const [employeeList, setEmployeeList] = useState(employees);

  useEffect(() => {
    if (employee) {
      setEmployeeList(employees.filter((i) => i._id !== employee._id));
    } else {
      setEmployeeList(employees);
    }
  }, [employee, employees]);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmployeeId(employee.employeeId);
      setPhone(employee.phone);
      setManager(employee.manager ? employee.manager._id : "");
    } else {
      setName("");
      setEmployeeId("");
      setPhone("");
      setManager("");
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Employee Form"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="p-10 bg-gray-900 border border-gray-800 rounded-lg shadow-lg max-w-md w-full mx-auto relative">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          {employee ? "Update Employee" : "Add Employee"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Employee Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter employee name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Employee ID
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter employee ID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Reporting Manager
            </label>
            <select
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select manager</option>
              {employeeList.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {employee ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EmployeeDialog;
