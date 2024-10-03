import React, { useContext } from "react";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../store/Strore";
import { Skeleton } from "@mui/material";

const FoodCard = ({ foods, loading, categories, show }) => {
  const { addToCart } = useContext(Context);

  const handleAddToCart = (food) => {
    addToCart(food);
    toast.success(`${food.name} added to cart!`, { autoClose: true });
  };

  const renderSkeleton = () => (
    <div className="relative overflow-hidden rounded-lg shadow transition w-[300px] bg-slate-100 p-2">
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="80%" height={15} />
      <Skeleton variant="text" width="40%" height={15} />
      <Skeleton variant="rectangular" width="100%" height={36} />
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 max-w-full justify-evenly mx-10">
      <Toaster position="top-right" reverseOrder={false} />

      {loading ? (
        <div className="flex flex-wrap gap-4 max-w-full justify-evenly mx-10">
          {Array.from(new Array(4)).map((_, index) => (
            <motion.div key={index} className="max-w-[300px]">
              {renderSkeleton()}
            </motion.div>
          ))}
        </div>
      ) : foods?.length > 0 ? (
        foods?.slice(show ? show[0] : 0, show ? show[1] : 4).map((food) => (
          <motion.div
            key={food._id}
            className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg max-w-[300px] bg-slate-100 p-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              alt="img"
              src={food.images ? food.images[0] : ""}
              className="h-[200px] w-full object-cover rounded-xl"
            />
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-lg font-bold">
              {categories[food.category] || food.category.name}
            </div>
            <div className="p-2 px-4">
              <h3 className="mt-0.5 text-lg text-gray-800 font-bold line-clamp-1">
                {food.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm/relaxed text-gray-500 font-bold break-words">
                {food.description}
              </p>
            </div>
            <div className="flex justify-between px-3 items-center">
              <h3 className="font-bold text-gray-700 flex">
                Price: <p className=" text-gray-500">Rs {food.price}</p>
              </h3>
              <h3 className=" font-bold flex items-center text-gray-500">
                Type:
                <p
                  className={` font-bold px-1 capitalize  ${
                    food.foodType === "veg" ? "text-green-500" : " text-red-500"
                  }`}
                >
                  {food.foodType}
                </p>
              </h3>
            </div>
            <div className="flex justify-center mt-4">
              <motion.button
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAddToCart(food)}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))
      ) : (
        // Render this when no foods are available
        <div className="flex justify-center w-full">
          <p className="text-lg font-bold text-gray-700">Foods Not Available</p>
        </div>
      )}
    </div>
  );
};

export default FoodCard;
