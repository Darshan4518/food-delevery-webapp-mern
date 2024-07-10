// models/Food.js
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  foodType: { type: String, required: true },
});

module.exports = mongoose.model("Food", foodSchema);
