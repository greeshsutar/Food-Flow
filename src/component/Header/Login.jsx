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

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "method") {
      setformdata((prev) => ({ ...prev, method: value, gmail: "", mobileno: "" }));
    } else {
      setformdata((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let verifydata = {
      password: formdata.password,
      ...(formdata.method === "email"
        ? { gmail: formdata.gmail }
        : { mobileno: formdata.mobileno })
    };

    try {
      let res = await fetch("http://localhost:3060/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verifydata)
      });
      let result = await res.json();
      if (res.ok) {
        alert("User logged in successfully!");
        localStorage.setItem("token", result.token);
        navigate("/profile");
      } else {
        setmsg(result.message);
      }
    } catch {
      setmsg("Error while logging in. Check your details.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Log in to your Swiggy account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Login Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login via
            </label>
            <select
              name="method"
              value={formdata.method}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          {/* Email or Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formdata.method === "email" ? "Email Address" : "Mobile Number"}
            </label>
            {formdata.method === "email" ? (
              <input
                type="email"
                name="gmail"
                placeholder="you@example.com"
                value={formdata.gmail}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            ) : (
              <input
                type="text"
                name="mobileno"
                placeholder="10-digit mobile number"
                value={formdata.mobileno}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-orange-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formdata.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Error Message */}
          {msg && (
            <p className="text-sm text-red-500">{msg}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
          >
            Login
          </button>

        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          New to Swiggy?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}