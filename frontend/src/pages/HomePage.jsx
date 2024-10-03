import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";

import CostumerReviews from "../components/CostumerReviews";
import BlogPage from "./BlogPage";
import AboutPage from "./AboutPage";
import TopDishes from "../components/TopDishes";
import NewleyAddedDishes from "../components/NewleyAddedDishes";

const HomePage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <NewleyAddedDishes />
      <TopDishes />
      <BlogPage />
      <CostumerReviews />
    </>
  );
};

export default HomePage;
