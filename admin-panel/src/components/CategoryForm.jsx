// src/components/CategoryForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/categories/upload", formData);
      setName("");
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <TextField
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Category
      </Button>
    </form>
  );
};

export default CategoryForm;
