import React, { useState } from "react";

function SearchBar({ searchQuery, setSearchQuery, isCollapsed }) {
  if (isCollapsed) return null; // hide search bar when collapsed

  return (
    <div className="p-4 border-b">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search components..."
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default function Sidebar({
  components,
  searchQuery,
  setSearchQuery,
  selectedComponentId,
  setSelectedComponentId,
  setIsEditing,
  onEdit,
  onDelete,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filtered = components.filter(({ name, tags }) => {
    const q = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(q) ||
      tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <aside
      className={`border-r flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Collapse toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-2 text-white hover:bg-blue-500 focus:outline-none"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </button>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isCollapsed={isCollapsed}
      />

      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <p className="p-4 text-gray-500">{isCollapsed ? "No items" : "No components found."}</p>
        ) : (
          <ul>
            {filtered.map((comp) => (
              <li
                key={comp.id}
                className={`flex items-center justify-between px-4 py-2 border-l-4 group cursor-pointer ${
                  selectedComponentId === comp.id
                    ? "border-blue-500 bg-blue-100 font-semibold"
                    : "border-transparent hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedComponentId(comp.id);
                  setIsEditing(false);
                }}
                title={comp.name}
              >
                <div className="flex-1 truncate">
                  {isCollapsed ? comp.name.charAt(0).toUpperCase() : comp.name}
                </div>

                {!isCollapsed && (
                  <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(comp);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(comp.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
