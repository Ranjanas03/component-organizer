import { useState, useEffect } from "react";
import JsxParser from "react-jsx-parser";

export default function AddEditForm({
  existingComponent,
  addComponent,
  updateComponent,
  cancelEdit,
}) {
  const [name, setName] = useState("");
  const [jsx, setJsx] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (existingComponent) {
      setName(existingComponent.name);
      setJsx(existingComponent.jsx);
      setTags(existingComponent.tags.join(", "));
    } else {
      setName("");
      setJsx("");
      setTags("");
    }
  }, [existingComponent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !jsx.trim()) {
      alert("Name and JSX fields cannot be empty.");
      return;
    }

    const tagsArr = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (existingComponent) {
      // Use existingComponent._id and updated data
      updateComponent({ ...existingComponent, name, jsx, tags: tagsArr });
    } else {
      // Use _id to keep consistent with your app
      addComponent({
        _id: Date.now().toString(),
        name,
        jsx,
        tags: tagsArr,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 bg-white rounded shadow space-y-4">
      {/* ... your inputs here ... */}

      <div>
        <label className="block font-semibold mb-1">Component Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Button"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">JSX Code</label>
        <textarea
          rows={8}
          value={jsx}
          onChange={(e) => setJsx(e.target.value)}
          className="w-full border px-3 py-2 rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`e.g. <button className="btn">Click me</button>`}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Preview</label>
        <div className="p-4 border rounded bg-gray-50 min-h-[50px]">
          <JsxParser jsx={jsx} renderInWrapper={false} />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. button, ui, form"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {existingComponent ? "Update" : "Add"} Component
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

