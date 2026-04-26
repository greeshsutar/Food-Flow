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
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "method") {
      setuserinput({
        method: value,
        gmail: "",
        mobileno: "",
        otp: "",
        newPassword: ""
      });
    } else {
      setuserinput((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    setmsg("");

    if (userinput.method === "email" && !userinput.gmail) {
      return setmsg("Email required");
    }

    if (userinput.method === "phone") {
      if (!userinput.mobileno) return setmsg("Phone required");
      if (userinput.mobileno.length !== 10)
        return setmsg("Enter valid 10-digit number");
    }

    const payload =
      userinput.method === "email"
        ? { gmail: userinput.gmail }
        : { mobileno: userinput.mobileno };

    try {
      setloading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok) {
        setotpsent(true);
      } else {
        setmsg(result.message);
      }
    } catch {
      setmsg("Something went wrong. Try again.");
    } finally {
      setloading(false);
    }
  }

  async function verification(e) {
    e.preventDefault();
    setmsg("");

    if (!userinput.otp || !userinput.newPassword) {
      return setmsg("OTP & new password required");
    }

    const verifydata = {
      otp: userinput.otp,
      newPassword: userinput.newPassword,
      ...(userinput.method === "email"
        ? { gmail: userinput.gmail }
        : { mobileno: userinput.mobileno })
    };

    try {
      setloading(true);

      const res = await fetch( `${import.meta.env.VITE_API_URL}/user/reset-password`
, {
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
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

        {!otpsent && (
          <div className="space-y-4">

            <select
              name="method"
              value={userinput.method}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>

            {userinput.method === "email" ? (
              <input
                name="gmail"
                value={userinput.gmail}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full border px-3 py-2 rounded"
              />
            ) : (
              <input
                name="mobileno"
                value={userinput.mobileno}
                onChange={handleChange}
                placeholder="Enter phone"
                className="w-full border px-3 py-2 rounded"
              />
            )}

            <button
              onClick={handleClick}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {otpsent && (
          <div className="space-y-4">

            <input
              name="otp"
              value={userinput.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="w-full border px-3 py-2 rounded"
            />

            <input
              name="newPassword"
              value={userinput.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              type="password"
              className="w-full border px-3 py-2 rounded"
            />

            <button
              onClick={verification}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded"
            >
              {loading ? "Processing..." : "Verify & Reset"}
            </button>
          </div>
        )}

        {msg && <p className="text-red-500 text-sm mt-3">{msg}</p>}

      </div>
    </div>
  );
}