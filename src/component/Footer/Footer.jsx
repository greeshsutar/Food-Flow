import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 px-6 mt-auto">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-lg">🍽️</span>
          <span className="text-white font-extrabold text-sm">
            Food<span className="text-orange-500">Flow</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 text-sm">
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/carrer" className="hover:text-white transition-colors">Careers</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Copyright */}
        <span className="text-xs">© 2026 FoodFlow™</span>

      </div>
    </footer>
  );
}