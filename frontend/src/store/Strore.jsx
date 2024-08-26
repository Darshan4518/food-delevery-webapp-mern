import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchFoods(selectedCategory);
  }, [selectedCategory]);

  const fetchFoods = useCallback(async (category) => {
    setLoading(true);
    try {
      const url =
        category === "All"
          ? "https://darshan-food-delevery-webapp.onrender.com/api/foods"
          : `https://darshan-food-delevery-webapp.onrender.com/api/foods/filter?category=${category}`;

      const response = await axios.get(url);
      setFoods(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

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
      }
      return [...prevCart, { ...food, quantity: 1 }];
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
        cart,
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
