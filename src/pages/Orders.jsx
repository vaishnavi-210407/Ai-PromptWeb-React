// src/pages/Orders.jsx
// Shows past orders with a Reorder button for each

import { useNavigate, Link } from "react-router-dom";
import { FaRedo } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useShop } from "../context/ShopContext";

export default function Orders() {
  const { pastOrders, reorder } = useShop();
  const navigate = useNavigate();

  const formatPrice = (num) => `₹${num.toLocaleString("en-IN")}`;

  const handleReorder = (order) => {
    reorder(order);
    navigate("/cart"); // Items cart mein add hote hi seedha cart pe le jao
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <main className="w-full px-6 md:px-10 py-8 flex-1">
        <h1 className="text-2xl font-bold text-gray-100 font-display mb-6">My Orders</h1>

        {pastOrders.length === 0 ? (
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-10 text-center">
            <p className="text-gray-300 text-lg">You haven't placed any orders yet.</p>
            <Link to="/dashboard" className="text-amber-400 underline text-sm mt-2 inline-block">
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {pastOrders.map((order) => (
              <div key={order.id} className="bg-navy-900 border border-navy-700 rounded-xl p-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div>
                    <p className="text-gray-100 font-semibold font-display">Order #{order.id}</p>
                    <p className="text-xs text-gray-500">Placed on {order.date}</p>
                  </div>
                  <button
                    onClick={() => handleReorder(order)}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-navy-950 text-sm font-semibold rounded-lg px-4 py-2 transition-colors"
                  >
                    <FaRedo className="text-xs" /> Reorder
                  </button>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
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

                <div className="flex justify-between text-gray-100 font-bold border-t border-navy-700 mt-4 pt-3">
                  <span>Total</span>
                  <span className="text-amber-400">{formatPrice(order.total)}</span>
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