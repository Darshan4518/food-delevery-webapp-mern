const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  additionalNumber: { type: String },
  additionalAddress: { type: String },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
