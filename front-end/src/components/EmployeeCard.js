import React from "react";

const EmployeeCard = ({ employee, onEdit, onDelete, onViewHierarchy }) => {
  return (
    <div className="p-6 border border-gray-800 rounded-lg shadow-lg bg-gray-900 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">{employee.name}</h2>
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-300 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors duration-200"
          title="Edit Employee"
        >
          <i className="fas fa-edit"></i> <span className="ml-2">Edit</span>
        </button>
      </div>
      <p className="text-gray-400 mb-1">
        <strong>ID:</strong> {employee.employeeId}
      </p>
      <p className="text-gray-400 mb-1">
        <strong>Phone:</strong> {employee.phone}
      </p>
      <p className="text-gray-400 mb-4">
        <strong>Manager:</strong>{" "}
        {employee.manager?.name || "No Manager Assigned"}
      </p>
      <div className="flex justify-between mt-6">
        <button
          className="text-red-500 hover:text-red-300 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors duration-200"
          onClick={onDelete}
          title="Delete Employee"
        >
          <i className="fas fa-trash-alt"></i>{" "}
          <span className="ml-2">Delete</span>
        </button>
        <button
          className="text-green-500 hover:text-green-300 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors duration-200"
          onClick={onViewHierarchy}
          title="View Hierarchy"
        >
          <i className="fas fa-sitemap"></i>{" "}
          <span className="ml-2">Hierarchy</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
