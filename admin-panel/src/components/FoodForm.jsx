// src/components/FoodForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const FoodForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://darshan-food-delevery-webapp.onrender.com/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("foodType", foodType);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.post(
        "https://darshan-food-delevery-webapp.onrender.com/api/foods/upload",
        formData
      );
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImages([]);
      setFoodType("veg");
      fetchFoods();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Food Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
      />
      <FormControl fullWidth>
        <legend>Category</legend>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories?.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <legend>Type</legend>
        <Select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
          <MenuItem value="veg">Veg</MenuItem>
          <MenuItem value="non-veg">Non-Veg</MenuItem>
        </Select>
      </FormControl>
      <input
        type="file"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files))}
        className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Food
      </Button>
    </form>
  );
};

export default FoodForm;
