// src/pages/Foods.jsx
import React from "react";
import FoodList from "../components/FoodList";
import { Link } from "react-router-dom";

const Foods = () => {
  return (
    <div className="container mx-auto p-8">
      <div className=" flex w-full px-4 justify-between items-center mb-7 ">
        <h1 className="text-xl font-bold md:text-2xl lg:text-4xl">
          Manage Foods
        </h1>

        <button className=" hidden lg:block  p-2 px-4 bg-blue-600 font-bold rounded-lg">
          <Link to="/foods/upload" className=" text-white font-bold">
            Add New
          </Link>
        </button>

        <button className=" lg:hidden py-1 px-4 bg-blue-600 text-white  rounded-lg">
          <Link to="/foods/upload" className=" text-white font-bold ">
            +
          </Link>
        </button>
      </div>

      <FoodList />
    </div>
  );
};

export default Foods;
