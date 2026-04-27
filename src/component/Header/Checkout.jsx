import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utils/CartSlice"; // adjust path if needed

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function Checkout() {
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartitem = useSelector((store) => store.cart.items);

  const token = localStorage.getItem("token");
  const payload = decodeToken(token);

  const total = cartitem.reduce(
    (sum, item) =>
      sum +
      ((item?.card?.info?.defaultPrice ||
        item?.card?.info?.price ||
        0) / 100),
    0
  );

  async function handleOrder() {
    if (cartitem.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/checkout`,
 {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          totalamount: total,
          items: cartitem,
          paymentMethod: payment,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Something went wrong");
        return;
      }

      // ✅ COD
      if (payment === "cod") {
        dispatch(clearCart()); // ✅ clear cart
        navigate("/payment-successful", { state: { method: "COD" } })
        return;
      }

      // ✅ Razorpay check
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      if (!result?.order) {
        alert("Order creation failed");
        return;
      }

      // ✅ Online Payment
      const options = {
        key: "rzp_test_SfnEsGSF2xSsuL",
        amount: result.order.amount,
        currency: "INR",
        order_id: result.order.id,
        name: "FoodFlow",
        description: "Food Order Payment",

        handler: async function (response) {
          try {
            const verifyRes = await fetch(
             `${import.meta.env.VITE_API_URL}/user/verify-payment`,

              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              dispatch(clearCart()); // ✅ clear cart
               navigate("/payment-successful", { state: { method: "ONLINE" } });
            } else {
              alert(verifyData.message || "Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            alert("Verification error");
          }
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
          },
        },

        prefill: {
          name: payload?.name || "User",
          email: payload?.email || "",
          contact: "9999999999",
        },

        theme: {
          color: "#f97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
  console.log("FULL ERROR:", response);
  console.log("DESCRIPTION:", response.error.description);
  console.log("REASON:", response.error.reason);
});
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            {cartitem.map((item) => (
              <div
                key={item.card.info.id}
                className="flex justify-between text-sm text-gray-600"
              >
                <span>{item.card.info.name}</span>
                <span className="font-medium">
                  ₹{(item?.card?.info?.defaultPrice || item?.card?.info?.price || 0) / 100}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 flex justify-between text-sm text-gray-500 mb-1">
            <span>Delivery Fee</span>
            <span className="text-green-500 font-medium">FREE</span>
          </div>

          <div className="flex justify-between font-bold text-gray-800 text-base">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>

          <div className="flex gap-3">
            <button
              onClick={() => setPayment("cod")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                payment === "cod"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-500 border-gray-300 hover:border-orange-400"
              }`}
            >
              Cash on Delivery
            </button>
            <button
              onClick={() => setPayment("online")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                payment === "online"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-500 border-gray-300 hover:border-orange-400"
              }`}
            >
              Online Payment
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </span>
          ) : (
            `Confirm & Pay ₹${total.toFixed(2)}`
          )}
        </button>

      </div>
    </div>
  );
}