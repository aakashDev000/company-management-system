import React from "react";

const EmployeeHierarchy = ({ hierarchy, onClose }) => {
  if (!hierarchy) {
    return null; // Return nothing if hierarchy data is missing
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-80 z-50">
      <div className="w-full max-w-lg p-6 bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          Employee Hierarchy
        </h2>

        <div className="mb-4">
          <p className="font-semibold text-lg text-gray-400">
            <strong>Manager:</strong>{" "}
            {hierarchy?.employee?.manager?.name || "No Manager Assigned"}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-400 mb-4">
            Subordinates
          </h3>
          {hierarchy.subordinates && hierarchy.subordinates.length > 0 ? (
            <ul className="space-y-3">
              {hierarchy.subordinates.map((subordinate) => (
                <li
                  key={subordinate._id}
                  className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-lg text-white shadow-md"
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold">{subordinate.name}</p>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {/* Additional details can go here */}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No subordinates found</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            onClick={onClose}
          >
            Close Hierarchy
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHierarchy;
