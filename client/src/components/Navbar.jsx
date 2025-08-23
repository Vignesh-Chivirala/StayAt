import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { openSignIn } = useClerk();
  const { user, setShowHotelReg, isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-5 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/70 shadow-lg backdrop-blur-xl text-gray-800 py-3"
          : "py-5 md:py-7 text-white"
      }`}
    >
      {/* Brand Name */}
      <Link to="/" className="text-2xl md:text-3xl font-bold font-playfair tracking-wide">
        <span
          className={`transition-colors ${
            isScrolled ? "text-gray-900" : "text-white"
          }`}
        >
          Stay<span className="text-indigo-500">At</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        {navLinks.map((navLink, index) => (
          <NavLink
            key={index}
            to={navLink.path}
            className={`group relative ${
              isScrolled ? "text-gray-800" : "text-white"
            } font-medium`}
            onClick={() => scrollTo(0, 0)}
          >
            {navLink.name}
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </NavLink>
        ))}

        {user && (
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium shadow-md transition-all ${
              isScrolled
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-white text-indigo-600 hover:bg-gray-100"
            }`}
            onClick={() => (isOwner ? navigate("/owner") : setShowHotelReg(true))}
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center gap-5">
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-2.5 rounded-full shadow-md transition-all duration-300"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <UserButton />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-lg flex flex-col md:hidden items-center justify-center gap-8 text-lg font-medium text-gray-800 transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {navLinks.map((navLink) => (
          <NavLink
            key={navLink.name}
            to={navLink.path}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-indigo-600 transition-colors"
          >
            {navLink.name}
          </NavLink>
        ))}

        {user && (
          <>
            <NavLink
              to="/my-bookings"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-indigo-600 transition-colors"
            >
              My Bookings
            </NavLink>
            <button
              className="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 transition-all"
              onClick={() => (isOwner ? navigate("/owner") : setShowHotelReg(true))}
            >
              {isOwner ? "Dashboard" : "List Your Hotel"}
            </button>
          </>
        )}

        {!user && (
          <button
            onClick={openSignIn}
            className="bg-indigo-600 text-white px-7 py-2.5 rounded-full shadow-md hover:bg-indigo-700 transition-all"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
