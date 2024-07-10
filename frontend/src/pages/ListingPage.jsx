import React, { useEffect, useContext } from "react";

import FoodCard from "../components/FoodCard";

import Loader from "../components/Loader";
import { Context } from "../store/Strore";
import CategoriesSection from "../components/CategoriesSection";
import SearchFilter from "../components/SearchFilter";
import PriceFilter from "../components/PriceFilter";

const ListingPage = () => {
  const { foods, loading, categories } = useContext(Context);
  const shows = [0, foods.length];
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="container mx-auto">
      <div className=" flex justify-between items-center mx-10">
        <PriceFilter />
        <SearchFilter />
      </div>
      <CategoriesSection />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h3 className=" my-3 text-2xl font-bold text-gray-700 mx-10">
            Foods
          </h3>
          <div className="flex flex-wrap">
            <FoodCard
              foods={foods}
              loading={loading}
              categories={categories}
              show={shows}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingPage;
