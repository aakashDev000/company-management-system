import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchEmployeeHierarchy,
} from "../state/employeeSlice";
import EmployeeCard from "../components/EmployeeCard";
import SearchBar from "../components/SearchBar";
import EmployeeDialog from "../components/EmployeeDialog";
import Loader from "../components/Loader";
import EmployeeHierarchy from "../components/EmployeeHierarchy";

const EmployeeManagement = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, hierarchy, loading, error } = useSelector(
    (state) => state.employee
  );
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (companyId) {
      dispatch(fetchEmployees(companyId));
    }
  }, [dispatch, companyId]);

  const handleAddEmployee = (employeeData) => {
    if (selectedEmployee) {
      dispatch(
        updateEmployee({ ...employeeData, _id: selectedEmployee._id })
      ).then(() => {
        setSelectedEmployee(null);
        dispatch(fetchEmployees(companyId));
      });
    } else {
      dispatch(createEmployee({ ...employeeData, company: companyId })).then(
        () => {
          dispatch(fetchEmployees(companyId));
        }
      );
    }
    setIsDialogOpen(false);
  };

  const handleDeleteEmployee = (employeeId) => {
    dispatch(deleteEmployee(employeeId));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowHierarchy = (employeeId) => {
    dispatch(fetchEmployeeHierarchy(employeeId));
    setShowHierarchy(true);
  };

  const handleOpenDialog = (employee = null) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedEmployee(null);
    setIsDialogOpen(false);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm)
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Employee Management
      </h1>

      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/companies")}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:from-gray-700 hover:to-gray-800 hover:shadow-lg transition-transform transform hover:scale-105"
        >
          Back to Companies
        </button>

        <button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:from-green-700 hover:to-green-800 hover:shadow-lg transition-transform transform hover:scale-105"
        >
          Add Employee
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      {showHierarchy && (
        <EmployeeHierarchy
          hierarchy={hierarchy}
          onClose={() => setShowHierarchy(false)}
        />
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error.message && error.message}</p>
      ) : (
        <>
          {employees && employees.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{
                maxHeight: "75vh",
                overflowY: employees.length > 6 ? "scroll" : "auto",
              }}
            >
              {filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee._id}
                  employee={employee}
                  onEdit={() => handleOpenDialog(employee)}
                  onDelete={() => handleDeleteEmployee(employee._id)}
                  onViewHierarchy={() => handleShowHierarchy(employee._id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full py-10">
              <p className="text-center text-2xl font-semibold text-gray-500">
                No data available
              </p>
            </div>
          )}
        </>
      )}

      <EmployeeDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleAddEmployee}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeeManagement;
