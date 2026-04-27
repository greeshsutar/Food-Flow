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
    <div className="flex items-center gap-3">

      {/* Username */}
      {isLoggedIn && (
        <Link
          to="/profile"
          className="flex items-center gap-1 text-sm font-medium text-orange-500"
        >
          <IoPersonOutline />
          <span className="hidden sm:inline">{username}</span>
        </Link>
      )}

      {/* Cart */}
      <Link
        to="/Cart"
        className="relative flex items-center text-2xl text-gray-700"
      >
        <MdOutlineShoppingCart />
        {cartItem.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] px-1.5 rounded-full">
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
        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-500"
      >
        Home
      </Link>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm font-semibold rounded-lg"
        >
          <MdOutlineLogout /> Logout
        </button>
      ) : (
        <>
          <Link
            to="/SignUp"
            className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-500"
          >
            Sign Up
          </Link>

          <Link
            to="/Login"
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg"
          >
            <MdOutlineLogin /> Login
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="text-xl font-extrabold text-orange-500">
            Food<span className="text-gray-800">Flow</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {rightSection}
          {navLinks}
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-3 md:hidden">
          {rightSection}

          {/* Hamburger */}
          <button
            className="text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-2 px-4 py-4 border-t">
          {navLinks}
        </div>
      )}
    </nav>
  );
}