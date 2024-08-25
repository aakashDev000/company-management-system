import React from "react";

const CompanyCard = ({
  company,
  handleOpenDialog,
  handleDeleteCompany,
  handleViewEmployees,
}) => {
  return (
    <div className="p-6 border border-gray-800 rounded-lg shadow-lg bg-gray-900 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-white mb-4">{company.name}</h2>
      <p className="text-gray-400 mb-1">
        <strong>Code:</strong> {company.code}
      </p>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleOpenDialog(company)}
          className="text-blue-500 hover:text-blue-300 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors duration-200"
          title="Edit Company"
        >
          <i className="fas fa-edit"></i> <span className="ml-2">Edit</span>
        </button>
        {/* <button
          onClick={() => handleDeleteCompany(company._id)}
          className="text-red-500 hover:text-red-300 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors duration-200"
          title="Delete Company"
        >
          <i className="fas fa-trash-alt"></i>{" "}
          <span className="ml-2">Delete</span>
        </button> */}
        <button
          onClick={() => handleViewEmployees(company._id)}
          className="text-green-500 hover:text-green-300 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors duration-200"
          title="View Employees"
        >
          <i className="fas fa-users"></i>{" "}
          <span className="ml-2">Employees</span>
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
