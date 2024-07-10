// src/components/CategoryList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ _id: "", name: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/categories/${currentCategory._id}`,
        {
          name: currentCategory.name,
        }
      );
      fetchCategories();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setCurrentCategory({ ...currentCategory, name: event.target.value });
  };

  return (
    <div className="  flex gap-4 flex-wrap justify-center md:justify-normal">
      {categories.map((category) => (
        <div
          key={category._id}
          className=" p-4 border-b shadow-xl bg-slate-200 hover:scale-110 duration-200 rounded-lg"
        >
          <div className="">
            <img
              src={category.image}
              alt="image"
              className="w-[100%] h-[130px] rounded-xl my-1 mx-auto"
            />
            <p className=" font-bold text-lg text-gray-700 my-3 text-center">
              {category.name}
            </p>
          </div>
          <div className=" flex justify-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(category)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(category._id)}
              style={{ marginLeft: "8px" }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={currentCategory.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryList;
