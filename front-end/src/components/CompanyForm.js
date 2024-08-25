import React, { useState } from "react";

const CompanyForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    onSubmit({ name, code });
    setName("");
    setCode("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-semibold">Company Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-4 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Company Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border rounded px-4 py-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Company
      </button>
    </form>
  );
};

export default CompanyForm;
