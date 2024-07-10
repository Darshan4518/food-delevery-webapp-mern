// src/pages/Categories.jsx
import React from "react";

import CategoryList from "../components/CategoryList";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="container mx-auto p-4 lg:p-8 ">
      <div className=" flex w-full px-4 justify-between items-center mb-7 ">
        <h1 className="text-xl font-bold md:text-2xl lg:text-4xl">
          Manage Categories
        </h1>

        <button className=" hidden lg:block  p-2 px-4 bg-blue-600 font-bold rounded-lg">
          <Link to="/categories/upload" className=" text-white font-bold">
            Add New
          </Link>
        </button>

        <button className=" lg:hidden py-1 px-4 bg-blue-600 text-white  rounded-lg">
          <Link to="/categories/upload" className=" text-white font-bold ">
            +
          </Link>
        </button>
      </div>
      <CategoryList />
    </div>
  );
};

export default Categories;
