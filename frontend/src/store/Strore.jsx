import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

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
      const response = await axios.get(
        "https://darshan-food-delevery-webapp.onrender.com/api/foods"
      );
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
        `https://darshan-food-delevery-webapp.onrender.com/api/foods/filter?category=${selectedCategory}`
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
      const response = await axios.get(
        "https://darshan-food-delevery-webapp.onrender.com/api/categories"
      );
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

  const addToCart = (food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === food._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== foodId));
  };

  const updateCartItemQuantity = (foodId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === foodId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <Context.Provider
      value={{
        categoriesList,
        loading,
        categories,
        foods,
        setFoods,
        cart,
        setCart,
        fetchFoods,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        setSelectedCategory,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
