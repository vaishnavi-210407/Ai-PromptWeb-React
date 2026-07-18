// src/pages/Wishlist.jsx

import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useShop } from "../context/ShopContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();
  const formatPrice = (num) => `₹${num.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <main className="w-full px-6 md:px-10 py-8 flex-1">
        <h1 className="text-2xl font-bold text-gray-100 font-display mb-6">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-10 text-center">
            <p className="text-gray-300 text-lg">Your wishlist is empty.</p>
            <Link to="/dashboard" className="text-amber-400 underline text-sm mt-2 inline-block">
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden"
              >
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase">{item.brand}</p>
                  <h3 className="text-gray-100 font-semibold font-display">{item.name}</h3>
                  <p className="text-amber-400 font-bold mt-1">{formatPrice(item.price)}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-navy-950 text-sm font-semibold rounded-lg py-2 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex items-center justify-center bg-navy-800 hover:bg-navy-700 border border-navy-700 text-red-400 rounded-lg px-3 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}