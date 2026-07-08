// src/components/ProductGrid.jsx
// Displays paginated products in a responsive grid; shows "No Products Found" if empty

import ProductCard from "./ProductCard";
import { useShop } from "../context/ShopContext";

export default function ProductGrid() {
  const { paginatedProducts, filteredProducts } = useShop();

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-10 text-center">
        <p className="text-gray-300 text-lg font-medium">No Products Found</p>
        <p className="text-gray-500 text-sm mt-1">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {paginatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}