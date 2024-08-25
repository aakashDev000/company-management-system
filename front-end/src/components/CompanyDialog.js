import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const CompanyDialog = ({ isOpen, onClose, onSubmit, company }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (company) {
      setName(company.name);
      setCode(company.code);
    } else {
      setName("");
      setCode("");
    }
  }, [company]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, code });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Company Form"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="p-10 bg-gray-900 border border-gray-800 rounded-lg shadow-lg max-w-md w-full mx-auto relative">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          {company ? "Update Company" : "Add Company"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Company Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company code"
              required
            />
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
              {company ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CompanyDialog;
