import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import logoimage from "../assets/svg/logo-image.png";
import smalllogoimage from "../assets/svg/small-logo-icon.png";
export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else setPageState("Sign in");
    });
  }, [auth]);
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return "text-black border-b-green-700";
    }
    return "text-gray-400 border-b-transparent";
  }
  function pathMatchRoutes(route1, route2) {
    if (route1 === location.pathname || route2 === location.pathname) {
      return "text-black border-b-green-700";
    }
    return "text-gray-400 border-b-transparent";
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src={logoimage}
            alt="logo"
            className="hidden sm:block h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <img
            src={smalllogoimage}
            alt="logo"
            className="h-6 sm:hidden cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10 ">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${pathMatchRoute(
                "/"
              )}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${pathMatchRoute(
                "/offers"
              )}`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${pathMatchRoutes(
                "/profile",
                "/sign-in"
              )}`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
