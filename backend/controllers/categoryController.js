const Category = require("../models/Category");

// Helper function for sending errors
const handleError = (res, error, statusCode = 400) => {
  res.status(statusCode).json({ message: error.message });
};

// Create a new category
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const image = req.file?.path;

  try {
    const newCategory = new Category({ name, image });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all categories
exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.status(200).json(categories);
  } catch (error) {
    handleError(res, error);
  }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.file?.path;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return handleError(res, new Error("Category not found"), 404);
    }

    category.name = name ?? category.name;
    if (image) category.image = image;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return handleError(res, new Error("Category not found"), 404);
    }
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    handleError(res, error);
  }
};
