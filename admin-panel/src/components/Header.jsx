import React from "react";
import { Link } from "react-router-dom";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import Logo from "../assets/logobg.png";

const Header = () => {
  const { isSignedIn, user } = useUser();

  return (
    <header className="bg-white w-[85vw]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" to="/">
              <img src={Logo} alt="logo" className=" w-[60px] h-[60px]" />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    to="/"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    to="/categories"
                  >
                    Categories
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    to="/foods"
                  >
                    Foods
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    to="/about"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    to="/blog"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!isSignedIn ? (
              <div className="sm:flex sm:gap-4">
                <SignInButton>
                  <button className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow">
                    Login
                  </button>
                </SignInButton>

                <div className="hidden sm:flex">
                  <SignUpButton>
                    <button className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600">
                      Register
                    </button>
                  </SignUpButton>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  Welcome, {user.firstName}
                </span>
                <SignOutButton>
                  <button className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow">
                    Log Out
                  </button>
                </SignOutButton>
              </div>
            )}

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
