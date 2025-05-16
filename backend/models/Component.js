const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jsx: { type: String, required: true },
  tags: [{ type: String }],
}, { timestamps: true });

const Component = mongoose.model("Component", componentSchema);

module.exports = Component;
