import React, { useEffect, useContext } from "react";
import FoodCard from "../components/FoodCard";
import { Context } from "../store/Strore";
import CategoriesSection from "../components/CategoriesSection";
import SearchFilter from "../components/SearchFilter";
import PriceFilter from "../components/PriceFilter";
import { Skeleton } from "@mui/material";

const ListingPage = () => {
  const { foods, loading, categories } = useContext(Context);
  const shows = [0, foods.length];

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const renderSkeletonList = () => (
    <div className="flex flex-wrap gap-4 mx-10">
      {Array.from(new Array(4)).map((_, index) => (
        <div key={index} className="w-[300px]">
          <div className="relative overflow-hidden rounded-lg shadow transition bg-slate-100 p-2">
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="80%" height={15} />
            <Skeleton variant="text" width="40%" height={15} />
            <Skeleton variant="rectangular" width="100%" height={36} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center my-2 mx-10">
        <PriceFilter />
        <SearchFilter />
      </div>
      <CategoriesSection />
      <div>
        <h3 className="my-3 text-2xl font-bold text-gray-700 mx-10">Foods</h3>
        <div className="flex flex-wrap gap-4">
          {loading ? (
            renderSkeletonList()
          ) : (
            <FoodCard foods={foods} categories={categories} show={shows} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
