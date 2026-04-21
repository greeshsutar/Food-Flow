import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [userinput, setuserinput] = useState({
    method: "email",
    gmail: "",
    mobileno: "",
    otp: "",
    newPassword: ""
  });

  const [msg, setmsg] = useState("");
  const [otpsent, setotpsent] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "method") {
      setuserinput({ ...userinput, method: value, gmail: "", mobileno: "" });
    } else {
      setuserinput({ ...userinput, [name]: value });
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    setmsg("");
    if (userinput.method === "email" && !userinput.gmail) return setmsg("Email required");
    if (userinput.method === "phone" && !userinput.mobileno) return setmsg("Phone required");

    const payload =
      userinput.method === "email"
        ? { gmail: userinput.gmail }
        : { mobileno: userinput.mobileno };

    try {
      const res = await fetch("http://localhost:3060/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (res.ok) setotpsent(true);
      else setmsg(result.message);
    } catch {
      setmsg("Something went wrong. Try again.");
    }
  }

  async function verification(e) {
    e.preventDefault();
    setmsg("");
    if (!userinput.otp || !userinput.newPassword) return setmsg("OTP & new password required");

    const verifydata = {
      otp: userinput.otp,
      newPassword: userinput.newPassword,
      ...(userinput.method === "email"
        ? { gmail: userinput.gmail }
        : { mobileno: userinput.mobileno })
    };

    try {
      const res = await fetch("http://localhost:3060/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verifydata)
      });
      const result = await res.json();
      if (res.ok) {
        alert("Password updated successfully!");
        navigate("/login");
      } else {
        setmsg(result.message);
      }
    } catch {
      setmsg("Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        {/* Top Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
            🔐
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
          <p className="text-sm text-gray-400 mt-1">
            Enter your {userinput.method === "email" ? "email" : "phone"} and we'll send you an OTP
          </p>
        </div>

        {/* Step 1 — shown when OTP not sent yet */}
        {!otpsent && (
          <div className="space-y-4">

            {/* Method Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reset via</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: "method", value: "email" } })}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                    userinput.method === "email"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-500 border-gray-300 hover:border-orange-400"
                  }`}
                >
                  📧 Email
                </button>
                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: "method", value: "phone" } })}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                    userinput.method === "phone"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-500 border-gray-300 hover:border-orange-400"
                  }`}
                >
                  📱 Phone
                </button>
              </div>
            </div>

            {/* Email or Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {userinput.method === "email" ? "Email Address" : "Mobile Number"}
              </label>
              {userinput.method === "email" ? (
                <input
                  name="gmail"
                  type="email"
                  placeholder="you@example.com"
                  value={userinput.gmail}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              ) : (
                <input
                  name="mobileno"
                  type="text"
                  placeholder="10-digit mobile number"
                  value={userinput.mobileno}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              )}
            </div>

            <button
              onClick={handleClick}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              Send OTP
            </button>

          </div>
        )}

        {/* Step 2 — shown after OTP sent */}
        {otpsent && (
          <div className="space-y-4">

            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 font-medium">
              ✅ OTP sent to your {userinput.method === "email" ? "email" : "phone"}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
              <input
                name="otp"
                type="text"
                placeholder="6-digit OTP"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 tracking-widest text-center text-lg font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              onClick={verification}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              Verify & Reset Password
            </button>

            {/* Go back to step 1 */}
            <button
              onClick={() => setotpsent(false)}
              className="w-full text-sm text-gray-400 hover:text-orange-500 transition-colors"
            >
              ← Change {userinput.method === "email" ? "email" : "phone number"}
            </button>

          </div>
        )}

        {/* Error */}
        {msg && (
          <p className="mt-4 text-sm text-red-500 text-center">{msg}</p>
        )}

        {/* Back to Login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Remembered it?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 font-medium cursor-pointer hover:underline"
          >
            Back to Login
          </span>
        </p>

      </div>
    </div>
  );
}