import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mt-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search components by name or tag..."
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
