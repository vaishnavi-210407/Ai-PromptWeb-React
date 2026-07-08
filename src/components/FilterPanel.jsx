// src/components/FilterPanel.jsx
// Brand, price range, in-stock, featured filters + Clear All button

import { useShop } from "../context/ShopContext";

const BRANDS = ["All", "Toyota", "Mahindra", "Tata", "Mercedes", "BMW", "Hyundai"];

const PRICE_RANGES = [
  { label: "All Prices", value: "All" },
  { label: "Under ₹10 Lakh", value: "0-1000000" },
  { label: "₹10L - ₹25L", value: "1000000-2500000" },
  { label: "₹25L - ₹50L", value: "2500000-5000000" },
  { label: "Above ₹50L", value: "5000000-100000000" },
];

export default function FilterPanel() {
  const {
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    featuredOnly,
    setFeaturedOnly,
    clearAllFilters,
    setCurrentPage,
  } = useShop();

  // Har filter change hone par page 1 pe reset karo
  const withReset = (fn) => (value) => {
    fn(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-amber-400 font-display font-semibold text-sm tracking-wide uppercase">
          Filters
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-xs text-gray-400 hover:text-amber-400 underline"
        >
          Clear All
        </button>
      </div>

      {/* Brand filter */}
      <div>
        <label className="block text-xs text-gray-400 mb-2">Brand</label>
        <select
          value={selectedBrand}
          onChange={(e) => withReset(setSelectedBrand)(e.target.value)}
          className="w-full bg-navy-800 border border-navy-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
        >
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Price range filter */}
      <div>
        <label className="block text-xs text-gray-400 mb-2">Price Range</label>
        <select
          value={priceRange}
          onChange={(e) => withReset(setPriceRange)(e.target.value)}
          className="w-full bg-navy-800 border border-navy-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
        >
          {PRICE_RANGES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* In Stock checkbox */}
      <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => withReset(setInStockOnly)(e.target.checked)}
          className="accent-amber-500 w-4 h-4"
        />
        In Stock Only
      </label>

      {/* Featured checkbox */}
      <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
        <input
          type="checkbox"
          checked={featuredOnly}
          onChange={(e) => withReset(setFeaturedOnly)(e.target.checked)}
          className="accent-amber-500 w-4 h-4"
        />
        Featured Only
      </label>
    </div>
  );
}