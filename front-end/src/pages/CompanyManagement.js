import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../state/companySlice";
import CompanyDialog from "../components/CompanyDialog";
import Loader from "../components/Loader";
import CompanyCard from "../components/CompanyCard";

const CompanyManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies, loading, error } = useSelector((state) => state.company);
  const { user } = useSelector((state) => state.auth);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/login");
    } else {
      dispatch(fetchCompanies());
    }
  }, [dispatch, navigate, user]);

  const handleOpenDialog = (company = null) => {
    setSelectedCompany(company);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCompany(null);
    setIsDialogOpen(false);
  };

  const handleAddOrUpdateCompany = (companyData) => {
    if (selectedCompany) {
      dispatch(updateCompany({ ...companyData, _id: selectedCompany._id }));
    } else {
      const existingCompany = companies.find(
        (company) => company.code === companyData.code
      );
      if (existingCompany) {
        alert("Company code must be unique. Please choose a different code.");
        return;
      }
      dispatch(createCompany(companyData));
    }
    setIsDialogOpen(false);
  };

  const handleDeleteCompany = (companyId) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      dispatch(deleteCompany(companyId));
    }
  };

  const handleViewEmployees = (companyId) => {
    navigate(`/companies/${companyId}/employees`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Company Management
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleOpenDialog()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Company
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error.message && error.message}</p>
      ) : (
        <>
          {companies && companies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <CompanyCard
                  key={company._id}
                  company={company}
                  handleDeleteCompany={handleDeleteCompany}
                  handleOpenDialog={handleOpenDialog}
                  handleViewEmployees={handleViewEmployees}
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

      <CompanyDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleAddOrUpdateCompany}
        company={selectedCompany}
      />
    </div>
  );
};

export default CompanyManagement;
