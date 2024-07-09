import React from "react";
import HomeProduct from "../components/Home/HomeProduct";
import SparkMyInterest from "../components/Home/SparkMyInterest";
import ImageCategoryGrid from "../components/Home/ImageCategoryGrid";
import StatsSection from "../components/Home/StatsSection";
import Header from "../components/Home/Header";
import TestimonialsSection from "../components/Home/TestimonialsSection";

const Home = () => {
  return (
    <div>
      hii
      <Header />
      <HomeProduct />
      <ImageCategoryGrid />
      <StatsSection />
      <TestimonialsSection />
      <SparkMyInterest />
    </div>
  );
};

export default Home;
