import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/Strore";
import FoodCard from "./FoodCard";

const TopDishes = () => {
  const { loading, foods, categories } = useContext(Context);

  const shows = [0, 4];

  return (
    <div className=" ">
      <div className=" flex justify-between items-center mx-10 my-8">
        <h3 className=" font-bold text-2xl text-gray-600 p-4 ">
          Our Top Dishes
        </h3>
        <Link
          className="group flex items-center justify-between gap-2 rounded-lg border border-current px-3 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
          to="/listings"
        >
          <span className="font-medium transition-colors group-hover:text-white">
            Find out more
          </span>

          <span className="shrink-0 rounded-full border border-indigo-600 bg-white p-2 group-active:border-indigo-500">
            <svg
              className="size-3 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </Link>
      </div>
      <FoodCard
        foods={foods}
        loading={loading}
        categories={categories}
        show={shows}
      />
    </div>
  );
};

export default TopDishes;
