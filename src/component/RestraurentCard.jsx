import { Link } from "react-router-dom";

export default function RestaurantCard({ swiggydata, datafilter }) {
  const data = datafilter.length > 0 ? datafilter : swiggydata;

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 py-6">
      {data.map((item) => (
        <Link
          to={`/RestraurentCard/${item.info.id}`}
          key={item.info.id}
          className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
              alt={item.info.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "";
                e.target.style.display = "none";
                e.target.parentElement.classList.add("bg-orange-50", "flex", "items-center", "justify-center");
                e.target.parentElement.innerHTML = `<span class="text-5xl">🍽️</span>`;
              }}
            />
            {/* Delivery SLA overlay */}
            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm tracking-wide">
              {item.info.sla?.slaString || "30-40 mins"}
            </span>
          </div>

          {/* Info */}
          <div className="p-4 flex-1 flex flex-col">
            <h2 className="font-extrabold text-gray-800 text-base leading-tight truncate group-hover:text-orange-500 transition-colors mb-1.5">
              {item.info.name}
            </h2>

            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-0.5 bg-emerald-600 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-sm">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z" fill="white"/>
                </svg>
                {item.info.avgRating}
              </span>
              <span className="text-[10px] text-gray-400 font-bold">•</span>
              <span className="text-[11px] text-gray-500 font-bold bg-gray-50 px-2 py-0.5 rounded">
                {item.info.sla?.lastMileTravelString || "2.5 km"}
              </span>
            </div>

            <p className="text-xs text-gray-500 truncate font-semibold mb-2">
              {item.info.cuisines?.slice(0, 3).join(", ")}
            </p>
            
            <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-semibold">
              <span className="truncate">{item.info.locality}</span>
              <span className="text-orange-500 font-bold group-hover:translate-x-0.5 transition-transform duration-200">
                Order Now →
              </span>
            </div>
          </div>
        </Link>
      ))}
  </div>
  );
}