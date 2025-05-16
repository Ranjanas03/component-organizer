const Component = require("../models/Component");

// Create
exports.createComponent = async (req, res) => {
  try {
    const { name, jsx, tags } = req.body;
    const newComponent = new Component({ name, jsx, tags });
    const savedComponent = await newComponent.save();
    res.status(201).json(savedComponent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All
exports.getComponents = async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get by ID
exports.getComponentById = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
exports.updateComponent = async (req, res) => {
  try {
    const updatedComponent = await Component.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComponent) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.json(updatedComponent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
exports.deleteComponent = async (req, res) => {
  try {
    const deleted = await Component.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.json({ message: "Component deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
