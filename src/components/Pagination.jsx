// src/components/Pagination.jsx

import { useShop } from "../context/ShopContext";

export default function Pagination() {
  const { currentPage, setCurrentPage, totalPages, filteredProducts } = useShop();

  if (filteredProducts.length === 0) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg text-sm bg-navy-800 border border-navy-700 text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-navy-700 transition-colors"
      >
        Previous
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            currentPage === num
              ? "bg-amber-500 text-navy-950"
              : "bg-navy-800 border border-navy-700 text-gray-200 hover:bg-navy-700"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg text-sm bg-navy-800 border border-navy-700 text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-navy-700 transition-colors"
      >
        Next
      </button>
    </div>
  );
}