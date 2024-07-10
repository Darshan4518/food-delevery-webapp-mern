import React from "react";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";
import TopDishes from "../components/TopDishes";
import NewleyAddedDishes from "../components/NewleyAddedDishes";
import CostumerReviews from "../components/CostumerReviews";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <TopDishes />
      <NewleyAddedDishes />
      <CostumerReviews />
    </>
  );
};

export default HomePage;
