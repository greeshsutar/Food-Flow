import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-6 border-t border-gray-900 mt-auto">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        {/* Brand Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍽️</span>
            <span className="text-2xl font-black tracking-tight text-white">
              Food<span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Flow</span>
            </span>
          </div>
          <p className="text-sm text-gray-500 max-w-sm font-medium leading-relaxed">
            Delivering delicious meals right to your doorstep with speed and style. Explore the best eateries in town.
          </p>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-xs font-black uppercase tracking-widest text-white">Company</h4>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link to="/about" className="hover:text-white hover:translate-x-0.5 transition-all duration-200">About Us</Link>
            <Link to="/contact" className="hover:text-white hover:translate-x-0.5 transition-all duration-200">Contact</Link>
          </div>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-xs font-black uppercase tracking-widest text-white">Legal</h4>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link to="/privacy" className="hover:text-white hover:translate-x-0.5 transition-all duration-200">Privacy Policy</Link>
            <Link to="/term" className="hover:text-white hover:translate-x-0.5 transition-all duration-200">Terms & Conditions</Link>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-xl mx-auto pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-600">
        <span>© 2026 FoodFlow Technologies Pvt. Ltd.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-400">Facebook</a>
          <a href="#" className="hover:text-gray-400">Twitter</a>
          <a href="#" className="hover:text-gray-400">Instagram</a>
        </div>
      </div>
    </footer>
  );
}