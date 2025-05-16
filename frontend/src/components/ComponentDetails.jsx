import React from "react";

export default function ComponentDetails({ component, onEdit, onDelete }) {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{component.name}</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-1">JSX Code:</h3>
        <pre className="bg-gray-100 p-3 rounded overflow-auto whitespace-pre-wrap">
          {component.jsx}
        </pre>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-1">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {component.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete "${component.name}"?`
              )
            ) {
              onDelete();
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
