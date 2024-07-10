// routes/categoryRoutes.js
const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const upload = multer({ storage });
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/categories/upload", upload.single("image"), createCategory);
router.get("/categories", getCategory);
router.put("/categories/:id", upload.single("image"), updateCategory);
router.delete("/categories/:id", deleteCategory);

module.exports = router;
