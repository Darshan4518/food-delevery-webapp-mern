// routes/foodRoutes.js
const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig.js");
const upload = multer({ storage });
const {
  createFood,
  updateFood,
  deleteFood,
  getFood,
  getFoodByCategory,
  searchFoodByNameOrCategory,
  searchFoodByPrice,
} = require("../controllers/foodController.js");

const router = express.Router();

router.get("/foods", getFood);
router.get("/foods/filter", getFoodByCategory);
router.get("/foods/filter/searchByPrice", searchFoodByPrice);
router.get("/foods/filter/search", searchFoodByNameOrCategory);
router.post("/foods/upload", upload.array("images", 5), createFood);
router.put("/foods/:id", upload.array("images", 5), updateFood);
router.delete("/foods/:id", deleteFood);

module.exports = router;
