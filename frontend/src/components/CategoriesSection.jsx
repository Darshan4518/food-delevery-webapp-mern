import React, { useContext } from "react";
import { Context } from "../store/Strore";
import { Skeleton } from "@mui/material";

const CategoriesSection = () => {
  const { categoriesList, setSelectedCategory } = useContext(Context);

  const renderSkeleton = () => (
    <div className="flex justify-evenly  flex-wrap mb-3 gap-x-4 w-full items-center">
      {Array.from(new Array(6)).map((_, index) => (
        <div key={index} className="cursor-pointer">
          <Skeleton
            variant="circular"
            width={100}
            height={100}
            className="my-2"
          />
          <Skeleton variant="text" width={80} height={30} className="mx-auto" />
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-600 m-3 mx-10">Categories</h3>
      <div className="flex justify-evenly items-center flex-wrap mb-3">
        {categoriesList?.length ? (
          <>
            <div
              className="cursor-pointer"
              onClick={() => setSelectedCategory("All")}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSacW6_FgJjB07Gl4OKF02REftLxy3nMATl0x4ho4CrPj-C5OVcrObqcXbHO2KEhs_wRGM&usqp=CAU"
                alt="All Categories"
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
                onClick={() => {
                  setSelectedCategory(category.name);
                }}
              >
                <img
                  src={category.image}
                  alt={`${category.name} category`}
                  className="w-[100px] h-[100px] my-2 rounded-full"
                />
                <p className="font-bold text-lg text-gray-700 my-3 text-center capitalize">
                  {category.name}
                </p>
              </div>
            ))}
          </>
        ) : (
          renderSkeleton()
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;
