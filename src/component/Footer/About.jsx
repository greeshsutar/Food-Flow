export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl mb-2">🍽️</span>
          <h1 className="text-2xl font-extrabold text-orange-500">
            Food<span className="text-gray-800">Flow</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Your favourite food, delivered fast</p>
        </div>

        {/* About Text */}
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            <span className="font-semibold text-gray-800">FoodFlow</span> is a food delivery web app built with React, Redux, and Tailwind CSS. It lets users browse restaurants, explore menus, add items to cart, and place orders seamlessly.
          </p>
          <p>
            This project was built as a learning experience to understand real-world concepts like API integration, JWT authentication, Redux state management, and responsive UI design.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Built With</h2>
          <div className="flex flex-wrap gap-2">
            {["React", "Redux Toolkit", "Tailwind CSS", "React Router", "Node.js", "MongoDB", "JWT"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-orange-50 text-orange-500 text-xs font-semibold rounded-full border border-orange-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Developer */}
        <div className="mt-6 border-t pt-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
            G
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Greesh Sutar</p>
            <p className="text-xs text-gray-400">Full Stack Developer</p>
          </div>
        </div>

      </div>
    </div>
  );
}