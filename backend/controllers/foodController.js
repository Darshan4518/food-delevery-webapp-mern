// controllers/foodController.js
const Food = require("../models/Food");
const { cloudinary } = require("../config/cloudinaryConfig");
const Category = require("../models/Category");

exports.createFood = async (req, res) => {
  const { name, description, price, category, foodType } = req.body;
  const images = req.files.map((file) => file.path);

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
    res.status(400).json({ message: error.message });
  }
};
exports.getFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, foodType } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : undefined;

  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;
    food.foodType = foodType || food.foodType;
    if (images) food.images = images;

    await food.save();
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    await Food.findByIdAndDelete(id);
    res.status(200).json({ message: "Food deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Filter

exports.getFoodByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    let foods;
    if (category && category !== "All") {
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
      foods = await Food.find({ category: categoryDoc._id }).populate(
        "category"
      );
    } else {
      foods = await Food.find().populate("category");
    }
    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchFoodByNameOrCategory = async (req, res) => {
  const { query } = req.query;

  try {
    const foods = await Food.find({
      name: { $regex: query, $options: "i" },
    }).populate("category");

    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchFoodByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  try {
    let queryFilters = {};

    if (minPrice && !isNaN(minPrice)) {
      queryFilters.price = { ...queryFilters.price, $gte: parseInt(minPrice) };
    }

    if (maxPrice && !isNaN(maxPrice)) {
      queryFilters.price = { ...queryFilters.price, $lte: parseInt(maxPrice) };
    }

    const foods = await Food.find(queryFilters).populate("category");

    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
