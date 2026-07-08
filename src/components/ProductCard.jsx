// src/components/ProductCard.jsx
// Reusable card for each car - used in ProductGrid, and can be reused elsewhere

import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);

  const formatPrice = (num) => `₹${num.toLocaleString("en-IN")}`;

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden group hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-400/5 transition-all">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-navy-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-blue-500/90 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
        {!product.stock && (
          <span className="absolute top-2 right-2 bg-red-500/90 text-white text-xs font-semibold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute bottom-2 right-2 bg-navy-950/80 backdrop-blur p-2 rounded-full text-amber-400 hover:scale-110 transition-transform"
        >
          {inWishlist ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.brand} • {product.category}
        </p>
        <h3 className="text-gray-100 font-semibold font-display text-lg mt-0.5">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mt-1">
          <FaStar className="text-amber-400 text-sm" />
          <span className="text-sm text-gray-300">{product.rating}</span>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-amber-400 font-bold text-lg">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-500 text-sm line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.stock}
            className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-navy-700 disabled:text-gray-500 disabled:cursor-not-allowed text-navy-950 text-sm font-semibold rounded-lg py-2 transition-colors"
          >
            <FaShoppingCart className="text-xs" />
            Add to Cart
          </button>
          <Link
            to={`/products/${product.id}`}
            className="flex-1 flex items-center justify-center bg-navy-800 hover:bg-navy-700 border border-navy-700 text-gray-200 text-sm font-medium rounded-lg py-2 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}