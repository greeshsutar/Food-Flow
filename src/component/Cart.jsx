import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "./utils/CartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const cartitem = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
 const [msg,setmsg]= useState("");
 const navigate = useNavigate();
  function handleremove(item) {
    dispatch(removeItem(item.card.info.id));
  }
  
  function handleclear() {
    dispatch(clearCart());
  }

    const total = cartitem.reduce(
    (sum, item) =>
      sum + (item.card.info.defaultPrice || item.card.info.price) / 100,
    0
  );
  async function handlePayment() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate("/checkout")

  }



  // Empty Cart
  if (cartitem.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center gap-4">
        <span className="text-7xl animate-pulse">🛒</span>
        <h2 className="text-2xl font-black text-gray-800">Your cart is empty</h2>
        <p className="text-sm font-semibold text-gray-400">Add delicious items from a restaurant to get started</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Your Cart</h1>
          <button
            onClick={handleclear}
            className="text-xs font-bold text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 bg-white hover:bg-red-50 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Clear All
          </button>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-6">
          {cartitem.map((item, index) => (
            <div
              key={item.card.info.id}
              className={`flex items-center gap-4 px-5 py-5 ${
                index !== cartitem.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {/* Image */}
              <img
                className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 shadow-sm border border-gray-100"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}
                alt={item.card.info.name}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-extrabold text-gray-800 truncate">
                  {item.card.info.name}
                </h2>

                {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black px-1.5 py-0.5 rounded">
                      ★ {item.card.info.ratings.aggregatedRating.rating}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">
                      ({item.card.info.ratings.aggregatedRating.ratingCountV2 || "10+"})
                    </span>
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-1.5 line-clamp-1 font-medium">
                  {item.card.info.description}
                </p>
              </div>

              {/* Price + Remove */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <span className="text-sm font-black text-gray-900">
                  ₹{(item.card.info.defaultPrice || item.card.info.price) / 100}
                </span>
                <button
                  onClick={() => handleremove(item)}
                  className="text-[10px] font-bold text-red-500 hover:text-white border border-red-100 hover:bg-red-500 hover:border-red-500 px-2.5 py-1 rounded-lg transition-all cursor-pointer bg-red-50/50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-100 p-6 mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Bill Summary</h3>
          <div className="flex justify-between text-sm text-gray-500 font-medium mb-3">
            <span>Item Total</span>
            <span className="font-bold text-gray-800">₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 font-medium mb-3">
            <span>Delivery Fee</span>
            <span className="text-emerald-600 font-black bg-emerald-50 px-2.5 py-0.5 rounded-lg text-[11px]">FREE</span>
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between text-base font-black text-gray-800">
            <span>To Pay</span>
            <span className="text-lg text-orange-500">₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
        >
          Proceed to Pay · ₹{total.toFixed(2)}
        </button>

      </div>
    </div>
  );
}