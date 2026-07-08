// src/components/Sidebar.jsx
// Quick category navigation (desktop sidebar / mobile horizontal scroll)

import { useShop } from "../context/ShopContext";

const CATEGORIES = ["All", "SUV", "Sedan", "Hatchback"];

export default function Sidebar() {
  const { selectedCategory, setSelectedCategory, setCurrentPage } = useShop();

  const handleSelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <aside className="bg-navy-900 border border-navy-700 rounded-xl p-4 lg:w-48 w-full shrink-0">
      <h3 className="text-amber-400 font-display font-semibold mb-3 text-sm tracking-wide uppercase">
        Categories
      </h3>
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`text-left px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-amber-500 text-navy-950 font-semibold"
                : "text-gray-300 hover:bg-navy-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </aside>
  );
}