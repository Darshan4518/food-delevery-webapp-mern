const Order = require("../models/Order.js");
const redisClient = require("../config/redisConfig.js");

const CACHE_EXPIRATION = 3600; // Cache expiration time in seconds (1 hour)

// Helper function to handle errors
const handleError = (res, error, statusCode = 500) => {
  res.status(statusCode).json({ message: error.message });
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    // Invalidate the cached orders
    await redisClient.del("orders");

    res.status(201).json(savedOrder);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    // Check if orders are cached in Redis
    const cachedOrders = await redisClient.get("orders");

    if (cachedOrders) {
      return res.status(200).json(JSON.parse(cachedOrders));
    }

    const orders = await Order.find().lean();

    // Cache the orders in Redis
    await redisClient.setEx("orders", CACHE_EXPIRATION, JSON.stringify(orders));

    res.status(200).json(orders);
  } catch (error) {
    handleError(res, error);
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the order is cached in Redis
    const cachedOrder = await redisClient.get(`order:${id}`);

    if (cachedOrder) {
      return res.status(200).json(JSON.parse(cachedOrder));
    }

    const order = await Order.findById(id).lean();
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Cache the order in Redis
    await redisClient.setEx(
      `order:${id}`,
      CACHE_EXPIRATION,
      JSON.stringify(order)
    );

    res.status(200).json(order);
  } catch (error) {
    handleError(res, error);
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    }).lean();
    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    // Invalidate the cache for the updated order and the orders list
    await redisClient.del(`order:${id}`);
    await redisClient.del("orders");

    res.status(200).json(updatedOrder);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    // Invalidate the cache for the deleted order and the orders list
    await redisClient.del(`order:${id}`);
    await redisClient.del("orders");

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    handleError(res, error);
  }
};
