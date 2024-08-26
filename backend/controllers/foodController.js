const Food = require("../models/Food.js");
const { cloudinary } = require("../config/cloudinaryConfig.js");
const Category = require("../models/Category.js");
const redisClient = require("../config/resdis.config.js");

const CACHE_EXPIRATION = 3600; // Cache expiration time in seconds (e.g., 1 hour)

// Helper function for sending errors
const handleError = (res, error, statusCode = 400) => {
  res.status(statusCode).json({ message: error.message });
};

// Create a new food item
exports.createFood = async (req, res) => {
  const { name, description, price, category, foodType } = req.body;
  const images = req.files?.map((file) => file.path);

  try {
    const newFood = new Food({
      name,
      description,
      price,
      images,
      category,
      foodType,
    });
    await newFood.save();

    // Invalidate Redis cache for food and category lists
    await redisClient.del("foods");
    await redisClient.del(`foods_by_category:${category}`);

    res.status(201).json(newFood);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all food items
exports.getFood = async (req, res) => {
  try {
    // Check if foods are cached in Redis
    const cachedFoods = await redisClient.get("foods");

    if (cachedFoods) {
      return res.status(200).json(JSON.parse(cachedFoods));
    }

    const foods = await Food.find().lean().populate("category");

    // Cache the result in Redis
    await redisClient.setEx("foods", CACHE_EXPIRATION, JSON.stringify(foods));

    res.status(200).json(foods);
  } catch (error) {
    handleError(res, error);
  }
};

// Get food items by category
exports.getFoodByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    let foods;

    // Check Redis cache for the specific category
    if (category && category !== "All") {
      const cachedFoods = await redisClient.get(
        `foods_by_category:${category}`
      );

      if (cachedFoods) {
        return res.status(200).json(JSON.parse(cachedFoods));
      }

      const categoryDoc = await Category.findOne({ name: category }).lean();
      if (!categoryDoc) {
        return handleError(res, new Error("Category not found"), 404);
      }
      foods = await Food.find({ category: categoryDoc._id })
        .populate("category")
        .lean();

      // Cache the result in Redis
      await redisClient.setEx(
        `foods_by_category:${category}`,
        CACHE_EXPIRATION,
        JSON.stringify(foods)
      );
    } else {
      // For "All" category, check the general foods cache
      const cachedFoods = await redisClient.get("foods");
      if (cachedFoods) {
        return res.status(200).json(JSON.parse(cachedFoods));
      }

      foods = await Food.find().populate("category").lean();

      // Cache the result in Redis
      await redisClient.setEx("foods", CACHE_EXPIRATION, JSON.stringify(foods));
    }

    res.status(200).json(foods);
  } catch (error) {
    handleError(res, error);
  }
};

// Other CRUD operations with cache invalidation (similar pattern)
exports.updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, foodType } = req.body;
  const images = req.files?.map((file) => file.path);

  try {
    const food = await Food.findById(id);
    if (!food) {
      return handleError(res, new Error("Food not found"), 404);
    }

    food.name = name ?? food.name;
    food.description = description ?? food.description;
    food.price = price ?? food.price;
    food.category = category ?? food.category;
    food.foodType = foodType ?? food.foodType;
    if (images) food.images = images;

    await food.save();

    // Invalidate Redis cache
    await redisClient.del("foods");
    await redisClient.del(`foods_by_category:${category}`);

    res.status(200).json(food);
  } catch (error) {
    handleError(res, error);
  }
};

exports.deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return handleError(res, new Error("Food not found"), 404);
    }

    // Invalidate Redis cache
    await redisClient.del("foods");
    await redisClient.del(`foods_by_category:${food.category}`);

    res.status(200).json({ message: "Food deleted" });
  } catch (error) {
    handleError(res, error);
  }
};
