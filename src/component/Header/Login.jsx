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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Login via</label>
            <select
              name="method"
              value={formdata.method}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5 text-sm"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formdata.method === "email" ? "Email Address" : "Mobile Number"}
            </label>
            {formdata.method === "email" ? (
              <input
                type="email"
                name="gmail"
                value={formdata.gmail}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2.5 text-sm"
              />
            ) : (
              <input
                type="text"
                name="mobileno"
                value={formdata.mobileno}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2.5 text-sm"
              />
            )}
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-sm text-orange-500">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2.5 text-sm"
            />
          </div>

          {/* Error */}
          {msg && <p className="text-red-500 text-sm">{msg}</p>}

          {/* ✅ Server waking up message */}
          {loading && (
            <p className="text-xs text-orange-400 text-center">
              Connecting to server, please wait...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2.5 rounded-lg disabled:opacity-60"
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

        <p className="mt-6 text-center text-sm text-gray-500">
          New here?{" "}
          <Link to="/signup" className="text-orange-500">Create account</Link>
        </p>

      </div>
    </div>
  );
}