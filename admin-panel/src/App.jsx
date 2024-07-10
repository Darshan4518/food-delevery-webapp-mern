import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Foods from "./pages/Foods";
import CategoryForm from "./components/CategoryForm";
import FoodForm from "./components/FoodForm";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

const clerkPubKey =
  "pk_test_dm9jYWwtcGFuZ29saW4tMjYuY2xlcmsuYWNjb3VudHMuZGV2JA";

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <SignedIn>
          <div className="flex">
            <SideMenu />
            <div>
              <Header />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/foods" element={<Foods />} />
                <Route path="/categories/upload" element={<CategoryForm />} />
                <Route path="/foods/upload" element={<FoodForm />} />
              </Routes>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <Routes>
            <Route path="/sign-in/*" element={<SignIn />} />
            <Route path="/sign-up/*" element={<SignUp />} />
            <Route path="*" element={<RedirectToSignIn />} />
          </Routes>
        </SignedOut>
      </Router>
    </ClerkProvider>
  );
};

export default App;
