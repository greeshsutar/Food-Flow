import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoPersonOutline, IoMenu, IoClose } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
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

  // Re-check token on every route change
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
    setMenuOpen(false); // close menu on page change
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/", { replace: true });
  }

  // All nav links in one array — no repetition
  const navLinks = (
    <>
      <Link to="/" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors">
        Home
      </Link>

      {isLoggedIn ? (
        <Link to="/profile" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-orange-500 hover:bg-orange-50 transition-colors">
          <IoPersonOutline /> Hi, {username}
        </Link>
      ) : (
        <Link to="/SignUp" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors">
          <IoPersonOutline /> Sign Up
        </Link>
      )}

      <Link to="/Cart" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors">
        <MdOutlineShoppingCart />
        Cart
        {cartItem.length > 0 && (
          <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cartItem.length}
          </span>
        )}
      </Link>

      {isLoggedIn ? (
        <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm font-semibold rounded-lg transition-colors">
          <MdOutlineLogout /> Logout
        </button>
      ) : (
        <Link to="/Login" className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors">
          <MdOutlineLogin /> Login
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" >
      <div className="flex items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="text-xl font-extrabold text-orange-500 tracking-tight">
            Food<span className="text-gray-800">Flow</span>
          </span>
        </Link>

        {/* Desktop — show on md and above */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks}
        </ul>

        {/* Mobile — hamburger button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>

      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-1 px-6 py-4 border-t border-gray-100">
          {navLinks}
        </div>
      )}

    </nav>
  );
}