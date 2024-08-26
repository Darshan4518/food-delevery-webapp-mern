const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderController.js");

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

module.exports = router;
