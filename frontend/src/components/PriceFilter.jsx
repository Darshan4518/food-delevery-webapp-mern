import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../store/Strore";

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { setFoods, fetchFoods } = useContext(Context);

  const handlePrice = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/foods/filter/searchByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching filtered results:", error);
      setFoods([]);
    }
  };
  useEffect(() => {
    handlePrice();
  }, [minPrice, maxPrice]);

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    fetchFoods();
  };

  return (
    <div className="flex gap-8">
      <div className="relative">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Availability </span>
          </summary>
        </details>
      </div>

      <div className="relative">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Price </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
            <div className="w-96 rounded border border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700">
                  The lowest price is Rs30
                </span>

                <button
                  type="button"
                  className="text-sm text-gray-900 underline underline-offset-4"
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
              </header>

              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between gap-4">
                  <label
                    htmlFor="FilterPriceFrom"
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-600">Rs</span>

                    <input
                      type="number"
                      id="FilterPriceFrom"
                      placeholder="From"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                    />
                  </label>

                  <label
                    htmlFor="FilterPriceTo"
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-600">Rs</span>

                    <input
                      type="number"
                      id="FilterPriceTo"
                      placeholder="To"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default PriceFilter;
