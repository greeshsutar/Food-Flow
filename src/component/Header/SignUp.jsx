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

    if (formData.method === "phone" && formData.mobileno.length !== 10) {
      return setmsg("Enter valid phone number");
    }

    try {
      const res = await fetch("http://localhost:3060/user/signup", {
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex gap-3">
            <input
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <select
            name="method"
            value={formData.method}
            onChange={handleMethodChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>

          {formData.method === "email" ? (
            <input
              name="gmail"
              placeholder="Email"
              value={formData.gmail}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          ) : (
            <input
              name="mobileno"
              placeholder="Phone"
              value={formData.mobileno}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          {msg && <p className="text-red-500 text-sm">{msg}</p>}

          <button className="w-full bg-orange-500 text-white py-2 rounded">
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}