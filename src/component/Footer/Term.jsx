import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  const terms = [
    {
      title: "Account Responsibility",
      desc: "You are responsible for maintaining the confidentiality of your account credentials. Do not share your password with anyone."
    },
    {
      title: "Orders & Payment",
      desc: "All orders placed on FoodFlow are for demo purposes only. No real payment is processed and no actual delivery takes place."
    },
    {
      title: "API & Content",
      desc: "Restaurant data is sourced from Swiggy's public API for educational and portfolio purposes only. FoodFlow is not affiliated with Swiggy."
    },
    {
      title: "Authentication",
      desc: "We use JWT-based authentication with expiry. You are automatically logged out when your session expires for security."
    },
    {
      title: "Modifications",
      desc: "FoodFlow reserves the right to update these terms at any time. Continued use of the app means you accept any changes."
    },
    {
      title: "Prohibited Use",
      desc: "You may not use FoodFlow for any unlawful purpose or attempt to misuse the platform in any way."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Terms & Conditions</h1>
          <p className="text-sm text-gray-400 mt-2">
            Please read these terms carefully before using FoodFlow.
            By using our app, you agree to these terms.
          </p>
          <p className="text-xs text-gray-300 mt-2">Last updated: April 2026</p>
        </div>

        {/* Terms List */}
        <div className="space-y-3 mb-4">
          {terms.map((term, index) => (
            <div key={term.title} className="bg-white rounded-2xl shadow-sm p-5 flex gap-4 items-start">

              {/* Number */}
              <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-500 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-800 mb-1">{term.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{term.desc}</p>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <p className="text-sm text-gray-500 mb-4">
            If you do not agree with any of these terms, please discontinue use of FoodFlow.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Explore FoodFlow
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-2.5 border border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 text-sm font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}