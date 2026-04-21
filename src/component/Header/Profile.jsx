import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token, navigate]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:3060/user/profile", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        if (res.ok) setUser(data);
        else setMsg(data.message || "Failed to load profile");
      } catch {
        setMsg("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchProfile();
  }, [token, navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    setUser(null);
  }

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm animate-pulse">Loading profile...</p>
      </div>
    );
  }

  // Error
  if (msg) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-sm">{msg}</p>
      </div>
    );
  }

  const fullName = (user?.name || "") + (user?.lastname ? " " + user.lastname : "");
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold mb-3">
            {initials || "U"}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{fullName || "User"}</h2>
          <p className="text-sm text-gray-400">Food Flow Member</p>
        </div>

        {/* Info Fields */}
        <div className="space-y-4 mb-8">

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
            <span className="text-sm text-gray-500">Full Name</span>
            <span className="text-sm font-medium text-gray-800">
              {fullName || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-gray-800">
              {user?.gmail || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
            <span className="text-sm text-gray-500">Mobile</span>
            <span className="text-sm font-medium text-gray-800">
              {user?.mobileno || "N/A"}
            </span>
          </div>

        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
        >
          Logout
        </button>

      </div>
    </div>
  );
}