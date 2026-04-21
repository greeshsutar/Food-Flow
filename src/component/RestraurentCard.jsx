import { Link } from "react-router-dom";

export default function RestaurantCard({ swiggydata, datafilter }) {
  const data = datafilter.length > 0 ? datafilter : swiggydata;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-4">
      {data.map((item) => (
        <Link
          to={`/RestraurentCard/${item.info.id}`}
          key={item.info.id}
          className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
              alt={item.info.name}
              onError={(e) => {         // ✅ only this is added
                e.target.onerror = null;
                e.target.src = "";
                e.target.style.display = "none";
                e.target.parentElement.classList.add("bg-orange-50", "flex", "items-center", "justify-center", "h-48");
                e.target.parentElement.innerHTML = `<span class="text-5xl">🍽️</span>`;
              }}
            />
            <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-md">
              30-40 min
            </span>
          </div>

          {/* Info */}
          <div className="p-3">
            <h2 className="font-bold text-gray-800 text-sm truncate">
              {item.info.name}
            </h2>

            <div className="flex items-center gap-1 mt-1">
              <span className="flex items-center gap-0.5 bg-green-700 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z" fill="white"/>
                </svg>
                {item.info.avgRating}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">30-40 min</span>
            </div>

            <p className="text-xs text-gray-400 mt-1 truncate">{item.info.cuisines[0]}</p>
            <p className="text-xs text-gray-400 truncate">{item.info.locality}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}