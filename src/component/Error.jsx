import { useRouteError, useNavigate } from "react-router-dom";

export default function Error() {
  const errors = useRouteError();
  const navigate = useNavigate();

  console.log(errors);
  console.log(errors.status);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8 text-center">

        {/* GIF */}
        <img
          src="https://nextstep.tcsapps.com/error/images/animationBoat.gif"
          alt="error"
          className="w-48 mx-auto mb-6 rounded-xl"
        />

        {/* Error Code */}
        <h1 className="text-6xl font-extrabold text-orange-500 mb-2">
          {errors.status || "Oops"}
        </h1>

        {/* Status Text */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {errors.statusText || "Something went wrong"}
        </h2>

        {/* Error Data */}
        <p className="text-sm text-gray-400 mb-6">
          {errors.data || "The page you're looking for doesn't exist."}
        </p>

        {/* Go Home Button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Back to Home
        </button>

      </div>
    </div>
  );
}