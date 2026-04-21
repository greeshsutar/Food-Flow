export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-8">

        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🔒</span>
          <h1 className="text-xl font-bold text-gray-800">Privacy Policy</h1>
        </div>

        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>We take your privacy seriously. FoodFlow collects only the information necessary to provide our services.</p>
          <p><span className="font-semibold text-gray-800">Data We Collect:</span> Name, email, phone number, and order history.</p>
          <p><span className="font-semibold text-gray-800">How We Use It:</span> To process orders, send OTPs, and improve your experience.</p>
          <p><span className="font-semibold text-gray-800">Data Security:</span> Passwords are hashed. Authentication uses JWT tokens with expiry.</p>
          <p><span className="font-semibold text-gray-800">Third Parties:</span> We do not sell or share your data with third parties.</p>
          <p>By using FoodFlow, you agree to this privacy policy.</p>
        </div>

      </div>
    </div>
  );
}