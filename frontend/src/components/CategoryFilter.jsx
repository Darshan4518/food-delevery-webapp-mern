// src/components/CategoryFilter.jsx
import React from "react";

const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-4">
      <select
        className="border rounded py-2 px-4 w-full"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
