import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import CartPage from "./pages/CartPage";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import ContextProvider from "./store/Strore";
import OrderDetails from "./pages/OrderPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <ClerkProvider
      publishableKey="pk_test_dm9jYWwtcGFuZ29saW4tMjYuY2xlcmsuYWNjb3VudHMuZGV2JA"
      signInForceRedirectUrl={
        "https://darshan-food-delevery-webapp.vercel.app/"
      }
      signUpForceRedirectUrl={
        "https://darshan-food-delevery-webapp.vercel.app/"
      }
    >
      <ContextProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route exact path="/" element={<HomePage />}></Route>
                <Route exact path="*" element={<ErrorPage />}></Route>

                <Route path="/listings" element={<ListingPage />}></Route>
                <Route
                  path="/cart"
                  element={
                    <>
                      <SignedIn>
                        <CartPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                ></Route>
                <Route
                  path="/order"
                  element={
                    <>
                      <SignedIn>
                        <OrderDetails />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                ></Route>
                <Route
                  path="/contact"
                  element={
                    <>
                      <SignedIn>
                        <ContactPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                ></Route>
                <Route
                  path="/about"
                  element={
                    <>
                      <SignedIn>
                        <AboutPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                ></Route>
                <Route
                  path="/blog"
                  element={
                    <>
                      <SignedIn>
                        <BlogPage />
                      </SignedIn>
                      <SignedOut>
                        <RedirectToSignIn />
                      </SignedOut>
                    </>
                  }
                ></Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ContextProvider>
    </ClerkProvider>
  );
};

export default App;
