// src/components/SortDropdown.jsx

import { useShop } from "../context/ShopContext";

const SORT_OPTIONS = [
  "Default",
  "Price: Low to High",
  "Price: High to Low",
  "Rating: High to Low",
  "Name: A to Z",
];

export default function SortDropdown() {
  const { sortOption, setSortOption, setCurrentPage } = useShop();

  const handleChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  return (
    <select
      value={sortOption}
      onChange={handleChange}
      className="bg-navy-800 border border-navy-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt} value={opt}>
          Sort: {opt}
        </option>
      ))}
    </select>
  );
}