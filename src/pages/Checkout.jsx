// src/pages/Checkout.jsx
// Checkout page with field validation, order placement, and cart auto-clear

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useShop } from "../context/ShopContext";

export default function Checkout() {
  const { cart, cartSubtotal, cartTotal, placeOrder } = useShop();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  // Cart clear hone ke baad bhi success screen pe items dikhane ke liye snapshot
  const [orderSummary, setOrderSummary] = useState(null);

  const formatPrice = (num) => `₹${num.toLocaleString("en-IN")}`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Typing shuru karte hi us field ka error hata do
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // Sab fields ki validation yahan hoti hai
  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!/^\d{6}$/.test(form.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    // Agar newErrors khali hai, matlab sab valid hai
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validate()) return; // Invalid hai toh yahin ruk jao, submit mat karo

    // Cart clear hone se pehle display ke liye snapshot bacha lo
    setOrderSummary({ items: cart, subtotal: cartSubtotal, total: cartTotal });
    placeOrder(form); // Order save hoga + cart apne aap khali ho jayega
    setOrderPlaced(true);
  };

  // Agar cart khali hai aur order abhi place nahi hua, checkout page useless hai
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col">
        <Navbar />
        <main className="w-full px-6 md:px-10 py-16 flex-1 text-center">
          <p className="text-gray-300 text-lg">Your cart is empty. Add some cars first!</p>
          <Link to="/dashboard" className="text-amber-400 underline text-sm mt-3 inline-block">
            Browse Cars
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Order success screen
  if (orderPlaced && orderSummary) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col">
        <Navbar />
        <main className="w-full px-6 md:px-10 py-20 flex-1 text-center">
          <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-100 font-display">Order Placed Successfully!</h1>
          <p className="text-gray-400 mt-2">
            Thank you, {form.fullName}. Your order will be delivered to {form.address}, {form.city}.
          </p>
          <p className="text-amber-400 font-semibold mt-4">
            Total Paid: {formatPrice(orderSummary.total)}
          </p>

          <div className="flex gap-3 justify-center mt-8 flex-wrap">
            <button
              onClick={() => navigate("/orders")}
              className="bg-navy-800 hover:bg-navy-700 border border-navy-700 text-gray-200 font-medium rounded-lg px-6 py-2.5 transition-colors"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold rounded-lg px-6 py-2.5 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <main className="w-full px-6 md:px-10 py-8 flex-1">
        <h1 className="text-2xl font-bold text-gray-100 font-display mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipping form */}
          <form
            onSubmit={handlePlaceOrder}
            noValidate
            className="lg:col-span-2 bg-navy-900 border border-navy-700 rounded-xl p-6 space-y-4"
          >
            <h2 className="text-gray-100 font-semibold font-display text-lg mb-2">Shipping Details</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`w-full bg-navy-800 border rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-500/60"
                    : "border-navy-700 focus:ring-amber-400/60"
                }`}
                placeholder="Your full name"
              />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full bg-navy-800 border rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-500/60"
                    : "border-navy-700 focus:ring-amber-400/60"
                }`}
                placeholder="10-digit mobile number"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`w-full bg-navy-800 border rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 ${
                  errors.address
                    ? "border-red-500 focus:ring-red-500/60"
                    : "border-navy-700 focus:ring-amber-400/60"
                }`}
                placeholder="House no, street, area"
              />
              {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={`w-full bg-navy-800 border rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 ${
                    errors.city
                      ? "border-red-500 focus:ring-red-500/60"
                      : "border-navy-700 focus:ring-amber-400/60"
                  }`}
                  placeholder="City"
                />
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className={`w-full bg-navy-800 border rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 ${
                    errors.pincode
                      ? "border-red-500 focus:ring-red-500/60"
                      : "border-navy-700 focus:ring-amber-400/60"
                  }`}
                  placeholder="6-digit pincode"
                />
                {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Payment Method</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={form.paymentMethod === "COD"}
                    onChange={handleChange}
                    className="accent-amber-500"
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={form.paymentMethod === "UPI"}
                    onChange={handleChange}
                    className="accent-amber-500"
                  />
                  UPI
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={form.paymentMethod === "Card"}
                    onChange={handleChange}
                    className="accent-amber-500"
                  />
                  Credit / Debit Card
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold rounded-lg py-3 mt-2 transition-colors"
            >
              Place Order
            </button>
          </form>

          {/* Order summary */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 h-fit sticky top-20">
            <h2 className="text-gray-100 font-semibold font-display text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-11 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm text-amber-400 font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm text-gray-400 mt-4 pt-3 border-t border-navy-700">
              <span>Subtotal</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-100 font-bold text-lg mt-2">
              <span>Total</span>
              <span className="text-amber-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}