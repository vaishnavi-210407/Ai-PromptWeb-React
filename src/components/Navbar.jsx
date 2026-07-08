// src/components/Navbar.jsx
// Top navbar: logo, search bar, wishlist icon, cart icon (with count), user info, logout

import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUserCircle, FaCarSide } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount, wishlistCount } = useShop();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-navy-900 border-b border-navy-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
          <FaCarSide className="text-amber-400 text-2xl" />
          <span className="text-2xl font-bold text-amber-400 font-display tracking-wide">
            AutoVerse
          </span>
        </Link>

        {/* Search bar - grows to fill space */}
        <div className="flex-1 min-w-[200px] order-3 sm:order-none">
          <SearchBar />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-5 ml-auto">
          <Link to="/wishlist" className="relative text-gray-200 hover:text-amber-400 transition-colors">
            <FaHeart className="text-xl" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-navy-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative text-gray-200 hover:text-amber-400 transition-colors">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-navy-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-2 text-gray-200">
            <FaUserCircle className="text-xl text-amber-400" />
            <span className="text-sm">{user?.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm bg-navy-800 hover:bg-navy-700 border border-navy-700 text-gray-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}