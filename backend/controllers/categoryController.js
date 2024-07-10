// controllers/categoryController.js
const Category = require("../models/Category");
const { cloudinary } = require("../config/cloudinaryConfig");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const image = req.file.path;

  try {
    const newCategory = new Category({ name, image });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.file ? req.file.path : undefined;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    if (image) category.image = image;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
