import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gmail: "",
    mobileno: "",
    password: "",
    method: "email"
  });

  const [msg, setmsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMethodChange = (e) => {
    setFormData({
      firstname: "",
      lastname: "",
      gmail: "",
      mobileno: "",
      password: "",
      method: e.target.value
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setmsg("");

    if (!formData.firstname || !formData.lastname || !formData.password) {
      return setmsg("All fields required");
    }

    if (formData.method === "email" && !formData.gmail) {
      return setmsg("Email is required");
    }

    if (formData.method === "phone" && formData.mobileno.length !== 10) {
      return setmsg("Enter valid phone number");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          password: formData.password,
          ...(formData.method === "email"
            ? { gmail: formData.gmail }
            : { mobileno: formData.mobileno })
        })
      });

      const result = await res.json();

      // 🔥 HANDLE OTP FLOW (MAIN FIX)
      // ✅ Correct keys — matches what OtpVerification.jsx reads
      if (result?.requireOtp === true) {
        // ✅ save based on what was actually filled
        if (formData.gmail) {
          localStorage.setItem("verifyType", "email");
          localStorage.setItem("verifyEmail", formData.gmail);
        } else {
          localStorage.setItem("verifyType", "phone");
          localStorage.setItem("verifyMobile", formData.mobileno);
        }
        navigate("/signup-otp");
        return;
      }

      // ✅ SUCCESS (fallback)
      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setmsg(result.message || "Signup failed");
      }

    } catch (err) {
      setmsg("Something went wrong. Try again.");
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await res.json();
  
      if (!res.ok) {
        setmsg(data.message || "Google Login Failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/profile");
    } catch (err) {
      setmsg("Google Login Failed");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-100 w-full max-w-md p-8 md:p-10 transition-all duration-300">

        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Create Account</h2>
          <p className="text-sm font-semibold text-gray-400 mt-1">Join FoodFlow to start ordering</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex gap-3">
            <input
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white"
            />
            <input
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white"
            />
          </div>

          <div>
            <select
              name="method"
              value={formData.method}
              onChange={handleMethodChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white cursor-pointer"
            >
              <option value="email">Email Address</option>
              <option value="phone">Phone Number</option>
            </select>
          </div>

          <div>
            {formData.method === "email" ? (
              <input
                name="gmail"
                placeholder="Email Address"
                value={formData.gmail}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white"
              />
            ) : (
              <input
                name="mobileno"
                placeholder="10-digit mobile number"
                value={formData.mobileno}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white"
              />
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white"
            />
          </div>

          {msg && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-3.5 rounded-xl border border-red-100">
              ⚠️ {msg}
            </div>
          )}

          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center">
            Sign Up
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-150"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 font-bold text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setmsg("Google Login Failed")}
          />
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 font-bold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}