// src/pages/ProductDetails.jsx

import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useShop } from "../context/ShopContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProducts, addToCart, toggleWishlist, isInWishlist } = useShop();

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-300 text-lg">Product not found.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-amber-400 underline text-sm"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const formatPrice = (num) => `₹${num.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 text-sm mb-6"
        >
          <FaArrowLeft /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden h-80 md:h-full">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              {product.brand} • {product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-100 font-display mt-1">{product.name}</h1>

            <div className="flex items-center gap-1 mt-2">
              <FaStar className="text-amber-400" />
              <span className="text-gray-300">{product.rating} Rating</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-amber-400 font-bold text-3xl">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-gray-500 line-through text-lg">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="bg-blue-500/90 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-400 mt-4 leading-relaxed">{product.description}</p>

            <p className="mt-4 text-sm">
              Status:{" "}
              {product.stock ? (
                <span className="text-green-400 font-medium">In Stock</span>
              ) : (
                <span className="text-red-400 font-medium">Out of Stock</span>
              )}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => addToCart(product)}
                disabled={!product.stock}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-navy-700 disabled:text-gray-500 disabled:cursor-not-allowed text-navy-950 font-semibold rounded-lg py-3 transition-colors"
              >
                <FaShoppingCart /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-gray-200 font-medium rounded-lg py-3 px-5 transition-colors"
              >
                {inWishlist ? <FaHeart className="text-amber-400" /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}