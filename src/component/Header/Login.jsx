import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    method: "email",
    gmail: "",
    mobileno: "",
    password: ""
  });

  const [msg, setmsg] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "method") {
      setformdata((prev) => ({
        ...prev,
        method: value,
        gmail: "",
        mobileno: ""
      }));
    } else {
      setformdata((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setmsg("");
    setLoading(true); // ✅ added

    const verifydata = {
      password: formdata.password,
      ...(formdata.method === "email"
        ? { gmail: formdata.gmail }
        : { mobileno: formdata.mobileno })
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verifydata)
      });

      const result = await res.json();

      if (result?.requireOtp === true) {
        if (formdata.gmail) {
          localStorage.setItem("verifyType", "email");
          localStorage.setItem("verifyEmail", formdata.gmail);
        } else {
          localStorage.setItem("verifyType", "phone");
          localStorage.setItem("verifyMobile", formdata.mobileno);
        }
        navigate("/signup-otp");
        return;
      }

      if (res.ok) {
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        setmsg(result.message || "Login failed");
      }

    } catch (err) {
      setmsg("Error while logging in. Check your details.");
    } finally {
      setLoading(false); // ✅ added
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-100 w-full max-w-md p-8 md:p-10 transition-all duration-300">

        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Welcome Back</h2>
          <p className="text-sm font-semibold text-gray-400 mt-1">Log in to your FoodFlow account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Login Via</label>
            <div className="relative">
              <select
                name="method"
                value={formdata.method}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white cursor-pointer"
              >
                <option value="email">Email Address</option>
                <option value="phone">Phone Number</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              {formdata.method === "email" ? "Email Address" : "Mobile Number"}
            </label>
            {formdata.method === "email" ? (
              <input
                type="email"
                name="gmail"
                value={formdata.gmail}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white"
              />
            ) : (
              <input
                type="text"
                name="mobileno"
                value={formdata.mobileno}
                onChange={handleChange}
                required
                placeholder="10-digit mobile number"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white"
              />
            )}
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
              <Link to="/forgot-password" className="text-xs font-bold text-orange-500 hover:text-orange-600">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white"
            />
          </div>

          {/* Error */}
          {msg && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-3.5 rounded-xl border border-red-100">
              ⚠️ {msg}
            </div>
          )}

          {/* ✅ Server waking up message */}
          {loading && (
            <p className="text-xs font-semibold text-orange-400 text-center animate-pulse">
              Connecting to server, please wait...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:pointer-events-none cursor-pointer flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          New here?{" "}
          <Link to="/signup" className="text-orange-500 font-bold hover:underline">Create account</Link>
        </p>

      </div>
    </div>
  );
}