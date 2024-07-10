// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[100%] lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Delicious Food Delivered.
            <strong className="font-extrabold text-red-700 sm:block">
              Anytime, Anywhere.
            </strong>
          </h1>

          <p className="mt-4 text-gray-700 sm:text-xl/relaxed">
            Experience the best food delivery service in town. Fast, reliable,
            and always fresh.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/foods"
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            >
              Get Started
            </Link>

            <Link
              to="/learn-more"
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
