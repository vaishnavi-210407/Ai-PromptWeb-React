// src/pages/Cart.jsx

import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useShop } from "../context/ShopContext";

export default function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, cartSubtotal, cartTotal } =
    useShop();

  const formatPrice = (num) => `₹${num.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
        <h1 className="text-2xl font-bold text-gray-100 font-display mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-10 text-center">
            <p className="text-gray-300 text-lg">Your cart is empty.</p>
            <Link to="/dashboard" className="text-amber-400 underline text-sm mt-2 inline-block">
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-20 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 uppercase">{item.brand}</p>
                    <h3 className="text-gray-100 font-semibold font-display truncate">{item.name}</h3>
                    <p className="text-amber-400 font-bold mt-1">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-7 h-7 flex items-center justify-center bg-navy-800 border border-navy-700 rounded text-gray-200 hover:bg-navy-700"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="text-gray-100 w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-7 h-7 flex items-center justify-center bg-navy-800 border border-navy-700 rounded text-gray-200 hover:bg-navy-700"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 h-fit sticky top-20">
              <h2 className="text-gray-100 font-semibold font-display text-lg mb-4">Order Summary</h2>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-100 font-bold text-lg border-t border-navy-700 pt-3 mt-3">
                <span>Total</span>
                <span className="text-amber-400">{formatPrice(cartTotal)}</span>
              </div>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold rounded-lg py-2.5 mt-5 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}