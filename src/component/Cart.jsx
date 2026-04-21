import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "./utils/CartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const cartitem = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const [msg,setmsg]= useState("");
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
  try{
  let amount = total.toFixed(2)
    let res =await fetch("http:localhost/3060/user/payment",{
     method:"POST",
     headers:{
      "Content-Type":"appication/json"
     },
     body:JSON.stringify(amount)
    })
   let result = await res.json()
    if(res.ok){
     alert("Payment Successful")
    }
    else{
      setmsg(result.message);
    }

  }
    catch(err){
      setmsg("Something Went Wrong ")
    }


  }



  // Empty Cart
  if (cartitem.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-3">
        <span className="text-6xl">🛒</span>
        <h2 className="text-xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-sm text-gray-400">Add items from a restaurant to get started</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
          <button
            onClick={handleclear}
            className="text-sm text-red-400 hover:text-red-600 border border-red-300 hover:border-red-500 px-3 py-1.5 rounded-lg transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
          {cartitem.map((item, index) => (
            <div
              key={item.card.info.id}
              className={`flex items-center gap-4 px-5 py-4 ${
                index !== cartitem.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {/* Image */}
              <img
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}
                alt={item.card.info.name}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-gray-800 truncate">
                  {item.card.info.name}
                </h2>

                <div className="flex items-center gap-1 mt-0.5">
                  <span className="flex items-center gap-0.5 bg-green-700 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                    <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
                      <path d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z" fill="white"/>
                    </svg>
                    {item?.card?.info?.ratings?.aggregatedRating?.rating ?? 0}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 ?? 0})
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                  {item.card.info.description}
                </p>
              </div>

              {/* Price + Remove */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-sm font-bold text-gray-800">
                  ₹{(item.card.info.defaultPrice || item.card.info.price) / 100}
                </span>
                <button
                  onClick={() => handleremove(item)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-2xl shadow-sm px-5 py-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Bill Summary</h3>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Item Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Delivery Fee</span>
            <span className="text-green-500 font-medium">FREE</span>
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between text-sm font-bold text-gray-800">
            <span>To Pay</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
        >
          Proceed to Pay · ₹{total.toFixed(2)}
        </button>

      </div>
    </div>
  );
}