import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/CartSlice"; // adjust path
import { useEffect } from "react";

export default function PaymentSuccessful() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Clear cart when this page loads
  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8 text-center">

        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-sm text-gray-400 mt-2">
          Your order has been placed. We will deliver it soon.
        </p>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-xl px-5 py-4 mt-6 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="text-green-500 font-semibold">Confirmed</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery</span>
            <span className="text-gray-700 font-medium">30-40 min</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment</span>
            <span className="text-gray-700 font-medium">Online</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-full border border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            View Profile
          </button>
        </div>

      </div>
    </div>
  );
}