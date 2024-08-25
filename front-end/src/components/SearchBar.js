import React from "react";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name, ID, or phone..."
      value={searchTerm}
      onChange={handleSearch}
      className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
