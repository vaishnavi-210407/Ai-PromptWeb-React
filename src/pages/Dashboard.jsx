// src/pages/Dashboard.jsx
// Main dashboard page - combines Navbar, Sidebar, FilterPanel, SortDropdown, ProductGrid, Pagination, Footer

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FilterPanel from "../components/FilterPanel";
import SortDropdown from "../components/SortDropdown";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { useShop } from "../context/ShopContext";

export default function Dashboard() {
  const { searchTerm, filteredProducts, setCurrentPage } = useShop();

  // Search change hone par page 1 pe reset - filter/sort apne dropdowns mein khud reset karte hain
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, setCurrentPage]);

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <main className="w-full px-6 md:px-10 py-6 flex-1">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar + Filters */}
          <div className="flex flex-col gap-4 lg:w-64 shrink-0">
            <Sidebar />
            <FilterPanel />
          </div>

          {/* Product listing */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <p className="text-gray-400 text-sm">
                Showing <span className="text-gray-200 font-medium">{filteredProducts.length}</span> cars
              </p>
              <SortDropdown />
            </div>

            <ProductGrid />
            <Pagination />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}