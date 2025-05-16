import React, { useState, useEffect } from "react";
import {
  fetchComponents,
  createComponent as apiCreateComponent,
  updateComponent as apiUpdateComponent,
  deleteComponent as apiDeleteComponent,
} from "../src/api/api";
import Sidebar from "./components/Sidebar";
import ComponentDetails from "./components/ComponentDetails";
import AddEditForm from "./components/AddEditForm";

export default function App() {
  const [components, setComponents] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getComponents = async () => {
      try {
        const response = await fetchComponents();
        setComponents(response.data);
      } catch (err) {
        setError("Failed to load components.");
      } finally {
        setLoading(false);
      }
    };
    getComponents();
  }, []);

  const selectedComponent = components.find((c) => c._id === selectedComponentId) || null;

  const addComponent = async (compData) => {
    try {
      // Assuming apiCreateComponent returns created component with _id
      const response = await apiCreateComponent(compData);
      setComponents([...components, response.data]);
      setSelectedComponentId(response.data._id);
      setIsEditing(false);
    } catch (error) {
      console.error("Add failed", error);
    }
  };

  const updateComponent = async (updatedData) => {
    try {
      const response = await apiUpdateComponent(updatedData._id, updatedData);
      setComponents(
        components.map((c) => (c._id === updatedData._id ? response.data : c))
      );
      setSelectedComponentId(updatedData._id);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const deleteComponent = async (id) => {
    try {
      await apiDeleteComponent(id);
      const filtered = components.filter((c) => c._id !== id);
      setComponents(filtered);
      if (selectedComponentId === id) {
        setSelectedComponentId(null);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        components={components}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedComponentId={selectedComponentId}
        setSelectedComponentId={setSelectedComponentId}
        setIsEditing={setIsEditing}
        onEdit={(comp) => {
          setSelectedComponentId(comp._id);
          setIsEditing(true);
        }}
        onDelete={deleteComponent}
      />

      <main className="flex-1 p-6 overflow-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : isEditing ? (
          <AddEditForm
            key={selectedComponent?._id || "new"}
            existingComponent={selectedComponent}
            addComponent={addComponent}
            updateComponent={updateComponent}
            cancelEdit={() => setIsEditing(false)}
          />
        ) : selectedComponent ? (
          <ComponentDetails
            component={selectedComponent}
            onEdit={() => setIsEditing(true)}
            onDelete={() => deleteComponent(selectedComponent._id)}
          />
        ) : (
          <div className="text-gray-500 flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-lg">No component selected</p>
            <button
              onClick={() => {
                setSelectedComponentId(null);
                setIsEditing(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add New Component
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
