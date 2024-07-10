import React from "react";
import { motion } from "framer-motion";
import ChefImg from "../assets/chef.png";
import { Link } from "react-router-dom";
const HeroSection = () => {
  const features = [
    {
      title: "Fast Delivery",
      description: "Get your food delivered in less than 30 minutes.",
      icon: "🚀",
    },
    {
      title: "Fresh Ingredients",
      description: "We use only the freshest ingredients in our dishes.",
      icon: "🥗",
    },
    {
      title: "Wide Variety",
      description: "Choose from a wide variety of cuisines and dishes.",
      icon: "🍜",
    },
  ];

  return (
    <div className="container mx-auto ">
      <motion.div
        className="relative bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="block xl:inline">Order your favorite</span>{" "}
                  <span className="block text-indigo-600 xl:inline">
                    food online
                  </span>
                </motion.h1>
                <motion.p
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Get the best food delivered to your doorstep. Fresh, hot, and
                  tasty!
                </motion.p>
                <motion.div
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="rounded-md shadow">
                    <Link
                      to="/cart"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Order Now
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
          <motion.div
            className="lg:w-1/2  justify-center hidden md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src={ChefImg}
              alt="Chef"
              className="w-full h-auto object-cover  "
            />
          </motion.div>
        </div>
      </motion.div>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Why Choose Us
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to order food
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="pt-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <span className="text-white text-2xl">
                            {feature.icon}
                          </span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
