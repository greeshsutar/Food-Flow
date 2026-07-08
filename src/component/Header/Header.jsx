import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoPersonOutline, IoMenu, IoClose } from "react-icons/io5";
import { MdOutlineShoppingCart, MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function Header() {
  const cartItem = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Check login on route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const payload = decodeToken(token);
      setUsername(payload?.name || payload?.firstname || "User");
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
    setMenuOpen(false);
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/", { replace: true });
  }

  // ✅ RIGHT SECTION (VISIBLE ALWAYS)
  const rightSection = (
    <div className="flex items-center gap-4">

      {/* Username */}
      {isLoggedIn && (
        <Link
          to="/profile"
          className="flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
        >
          <IoPersonOutline className="text-lg" />
          <span className="hidden sm:inline truncate max-w-[120px]">{username}</span>
        </Link>
      )}

      {/* Cart */}
      <Link
        to="/cart"
        className="relative flex items-center p-2 text-gray-700 hover:text-orange-500 transition-colors rounded-full hover:bg-gray-50"
      >
        <MdOutlineShoppingCart className="text-2xl" />
        {cartItem.length > 0 && (
          <span className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce shadow-md">
            {cartItem.length}
          </span>
        )}
      </Link>
    </div>
  );

  // ✅ HAMBURGER LINKS (NO CART / USER HERE)
  const navLinks = (
    <>
      <Link
        to="/"
        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          location.pathname === "/"
            ? "text-orange-500 bg-orange-50"
            : "text-gray-600 hover:bg-gray-50 hover:text-orange-500"
        }`}
      >
        Home
      </Link>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer"
        >
          <MdOutlineLogout /> Logout
        </button>
      ) : (
        <>
          <Link
            to="/signup"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              location.pathname === "/signup"
                ? "text-orange-500 bg-orange-50"
                : "text-gray-600 hover:bg-gray-50 hover:text-orange-500"
            }`}
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <MdOutlineLogin /> Login
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] sticky top-0 z-50 transition-all duration-300">
      
      {/* HEADER */}
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3.5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🍽️</span>
          <span className="text-2xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Food</span>
            <span className="text-gray-800">Flow</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {rightSection}
          <div className="h-6 w-[1px] bg-gray-200"></div>
          {navLinks}
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-3 md:hidden">
          {rightSection}

          {/* Hamburger */}
          <button
            className="text-2xl text-gray-700 p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-2 px-6 py-4 border-t border-gray-100 bg-white animate-fadeIn">
          {navLinks}
        </div>
      )}
    </nav>
  );
}