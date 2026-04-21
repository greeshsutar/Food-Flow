import { useState } from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);

  const cartitem = useSelector((store) => store.cart.items);

  const total = cartitem.reduce(
    (sum, item) =>
      sum + (item.card.info.defaultPrice || item.card.info.price) / 100,
    0
  );

  async function handleOrder() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3060/user/checkout", {
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
        setLoading(false);
        return;
      }

      //COD flow
      if (payment === "cod") {
        alert("Order placed with Cash on Delivery");
        setLoading(false);
        return;
      }

      // ONLINE PAYMENT (Razorpay)
      if (payment === "online") {
        const options = {
          key: "rzp_test_SfnEsGSF2xSsuL", //  replace with your key
          amount: result.order.amount,
          currency: "INR",
          order_id: result.order.id,
          name: "Food Flow",
          description: "Food Order Payment",

          handler: function (response) {
            alert("Payment Successful");
            console.log(response);
          },

          prefill: {
            name: "User",
            email: "user@example.com",
          },

          theme: {
            color: "#f97316",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm">

        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        {/* Order Summary */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          {cartitem.map((item) => (
            <div key={item.card.info.id} className="flex justify-between text-sm mb-1">
              <span>{item.card.info.name}</span>
              <span>
                ₹{(item.card.info.defaultPrice || item.card.info.price) / 100}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t pt-3 mb-4 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Payment Method</label>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={handleOrder}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white ${
            loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading
            ? "Processing..."
            : `Confirm & Pay ₹${total.toFixed(2)}`}
        </button>

      </div>
    </div>
  );
}