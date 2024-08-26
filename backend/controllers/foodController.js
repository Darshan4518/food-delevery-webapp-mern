const Food = require("../models/Food");
const { cloudinary } = require("../config/cloudinaryConfig");
const Category = require("../models/Category");

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
    res.status(201).json(newFood);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all food items
exports.getFood = async (req, res) => {
  try {
    const foods = await Food.find().lean().populate("category");
    res.status(200).json(foods);
  } catch (error) {
    handleError(res, error);
  }
};

// Update an existing food item
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
    res.status(200).json(food);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a food item
exports.deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return handleError(res, new Error("Food not found"), 404);
    }
    res.status(200).json({ message: "Food deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

// Get food items by category
exports.getFoodByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    let foods;
    if (category && category !== "All") {
      const categoryDoc = await Category.findOne({ name: category }).lean();
      if (!categoryDoc) {
        return handleError(res, new Error("Category not found"), 404);
      }
      foods = await Food.find({ category: categoryDoc._id })
        .populate("category")
        .lean();
    } else {
      foods = await Food.find().populate("category").lean();
    }
    res.status(200).json(foods);
  } catch (error) {
    handleError(res, error);
  }
};

// Search food items by name or category
exports.searchFoodByNameOrCategory = async (req, res) => {
  const { query } = req.query;

  try {
    const foods = await Food.find({
      name: { $regex: query, $options: "i" },
    })
      .populate("category")
      .lean();

    res.status(200).json(foods);
  } catch (error) {
    handleError(res, error);
  }
};

// Search food items by price range
exports.searchFoodByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  try {
    const queryFilters = {};
    if (minPrice && !isNaN(minPrice))
      queryFilters.price = { $gte: parseInt(minPrice) };
    if (maxPrice && !isNaN(maxPrice))
      queryFilters.price = { ...queryFilters.price, $lte: parseInt(maxPrice) };

    const foods = await Food.find(queryFilters).populate("category").lean();
    res.status(200).json(foods);
  } catch (error) {
    handleError(res, error);
  }
};
