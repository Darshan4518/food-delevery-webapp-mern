import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, TextField, Box } from "@mui/material";
import { ClipLoader } from "react-spinners";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentFood, setCurrentFood] = useState({
    name: "",
    _id: "",
    description: "",
    category: "",
    price: "",
  });
  const [categories, setCategories] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      fetchFoods();
    } else {
      fetchSelectedCategoryFood();
    }
  }, [selectedCategory]);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/foods");
      setFoods(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedCategoryFood = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/foods/filter?category=${selectedCategory}`
      );
      setFoods(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      const categoriesMap = response.data.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
      }, {});
      setCategories(categoriesMap);
      setCategoriesList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/foods/${id}`);
      fetchFoods();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (food) => {
    setCurrentFood(food);
    setOpen(true);
  };

  const handleChange = (e) => {
    setCurrentFood({ ...currentFood, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/foods/${currentFood._id}`,
        currentFood
      );
      fetchFoods();

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-evenly items-center flex-wrap mb-3">
        <div
          className="cursor-pointer"
          onClick={() => setSelectedCategory("All")}
        >
          <img
            src="path_to_all_categories_image"
            alt="All"
            className="w-[100px] h-[100px] my-2 rounded-full"
          />
          <p className="font-bold text-lg text-gray-700 my-3 text-center">
            All
          </p>
        </div>
        {categoriesList.map((category) => (
          <div
            className="cursor-pointer"
            key={category._id}
            onClick={() => setSelectedCategory(category.name)}
          >
            <img
              src={category.image}
              alt="image"
              className="w-[100px] h-[100px] my-2 rounded-full"
            />
            <p className="font-bold text-lg text-gray-700 my-3 text-center">
              {category.name}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="my-3 font-bold text-2xl underline text-gray-800 p-2 capitalize">
          {selectedCategory}
        </h3>
        <div className="flex flex-wrap gap-4">
          {loading ? (
            <div className="flex justify-center w-full h-screen">
              <ClipLoader color={"#36D7B7"} loading={loading} size={100} />
            </div>
          ) : foods.length > 0 ? (
            foods.map((food) => (
              <div
                key={food._id}
                className="overflow-hidden rounded-lg shadow transition hover:shadow-lg max-w-[300px] bg-slate-100 p-2"
              >
                <img
                  alt="img"
                  src={food.images ? food.images[0] : ""}
                  className="h-[200px] w-full object-cover"
                />
                <div className="p-2 px-4">
                  <h3 className="mt-0.5 text-lg text-gray-800 font-bold">
                    {food.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm/relaxed text-gray-500 font-bold break-words">
                    {food.description}
                  </p>
                </div>
                <div className="flex justify-between px-3 items-center">
                  <h3 className="text-gray-700 font-bold rounded-lg bg-orange-400 p-2 px-4">
                    {categories[food.category] || food.category.name}
                  </h3>
                  <p className="font-bold text-gray-700">
                    Price: Rs{food.price}
                  </p>
                </div>
                <div className="p-2 flex justify-end gap-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(food)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div>Foods Not Available</div>
          )}

          <Modal open={open} onClose={handleClose}>
            <Box
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white rounded-lg shadow"
              style={{ width: "400px" }}
            >
              <h2>Edit Food</h2>
              <TextField
                name="name"
                label="Name"
                value={currentFood.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                value={currentFood.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="price"
                label="Price"
                value={currentFood.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="category"
                label="Category"
                value={currentFood.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <div className="flex justify-end mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default FoodList;
