import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const inputs = useRef([]);
  const navigate = useNavigate();

  const type = localStorage.getItem("verifyType");
  const contact =
    type === "email"
      ? localStorage.getItem("verifyEmail")
      : localStorage.getItem("verifyMobile");

  // ✅ Countdown timer
  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  //  Auto jump to next box
  function handleChange(value, index) {
    if (!/^\d*$/.test(value)) return; // numbers only
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1].focus();
  }

  //  Backspace goes to previous box
  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  }

  async function handleVerify() {

    //basic validation for 6 digit
    setMsg("");
    const otpValue = otp.join("");
    if (otpValue.length < 6) return setMsg("Please enter all 6 digits.");

    const data = { otp: otpValue };
    if (type === "email") data.gmail = localStorage.getItem("verifyEmail");
    else data.mobileno = localStorage.getItem("verifyMobile");

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/signup-otp`,
 {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        localStorage.clear();
        navigate("/login");
      } else {
        setMsg(result.message);
        setOtp(["", "", "", "", "", ""]);
        inputs.current[0].focus();
      }
    } catch {
      setMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8 text-center">

        {/* Icon */}
        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📩</span>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
        <p className="text-sm text-gray-400 mt-1">
          {type === "email" ? "OTP sent to your email" : "OTP sent to your mobile"}
        </p>

        {/* Contact chip */}
        {contact && (
          <span className="inline-block mt-2 px-3 py-1 bg-orange-50 text-orange-500 text-xs font-semibold rounded-full border border-orange-200">
            {contact}
          </span>
        )}

        {/* OTP Boxes */}
        <div className="flex justify-center gap-3 mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-11 h-12 text-center text-lg font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                digit ? "border-orange-500 bg-orange-50" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Error */}
        {msg && <p className="mt-3 text-sm text-red-500">{msg}</p>}

        {/* Timer */}
        <p className="mt-4 text-sm text-gray-400">
          Code expires in{" "}
          <span className={`font-bold ${seconds <= 60 ? "text-red-500" : "text-gray-600"}`}>
            {seconds > 0 ? formatTime() : "Expired"}
          </span>
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || seconds <= 0}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Verifying...
            </span>
          ) : (
            "Verify OTP"
          )}
        </button>

        {/* Resend */}
        <p className="mt-4 text-sm text-gray-400">
          Didn't receive it?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-orange-500 font-medium cursor-pointer hover:underline"
          >
            Go back & retry
          </span>
        </p>

      </div>
    </div>
  );
}