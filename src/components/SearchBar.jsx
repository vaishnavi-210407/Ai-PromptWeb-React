// src/components/SearchBar.jsx
// Real-time search input, connected directly to ShopContext

import { FaSearch } from "react-icons/fa";
import { useShop } from "../context/ShopContext";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useShop();

  return (
    <div className="relative w-full max-w-md">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by car name, brand, or category..."
        className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60"
      />
    </div>
  );
}