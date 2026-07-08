import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "./utils/CartSlice";

export default function Menu() {

  let {id} = useParams();

  const [restdetail, setrestdetail] = useState([]);

  useEffect(() => {
    async function menudata() {
      try {
        // let data = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=15.796320490637022&lng=74.47427418082952&restaurantId=${id}&submitAction=ENTER`;
        // let response = await axios.get(data);
         
        //<img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/9/10/a1770166-5a13-43e2-8673-c9e5ce0e5f02_5143af32-d9d7-44b6-9ee7-8dda3d333144.jpg">
let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu/${id}`);

        const items =
          response?.data?.data?.cards?.[5]
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[5]
            ?.card?.card?.itemCards;
        setrestdetail(items);
      } catch (error) {
    console.log(error);
  setrestdetail([]);
      }
    }
    menudata();
  }, [id]);

  let dispatchaction = useDispatch();

  function handleaction(item) {


    dispatchaction(addItem(item));
  }
  if (!restdetail?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50/30">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-gray-500">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h1 className="font-black text-2xl text-gray-800 tracking-tight">
          Recommended
          <span className="ml-2 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
            {restdetail.length} items
          </span>
        </h1>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {restdetail?.map((item) => (
          <div
            key={item.card.info.id}
            className="flex flex-row-reverse items-center justify-between border-b border-gray-100/70 pb-6 pt-4 gap-6 hover:bg-gray-50/30 px-3 rounded-2xl transition-all duration-300"
          >

            {/* Image + ADD Button */}
            <div className="flex flex-col items-center flex-shrink-0 relative">
              <img
                className="rounded-2xl w-32 h-32 md:w-36 md:h-36 object-cover shadow-sm border border-gray-100"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}
                alt={item.card.info.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback */}
              <div
                className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-orange-50 flex flex-col items-center justify-center gap-1 border border-orange-100/50"
                style={{ display: "none" }}
              >
                <span className="text-3xl">🍽️</span>
                <span className="text-orange-500 font-black text-xs">Food<span className="text-gray-800">Flow</span></span>
              </div>
              
              <button
                onClick={() => handleaction(item)}
                className="absolute -bottom-2 bg-white border border-gray-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 font-extrabold rounded-xl px-6 py-1.5 text-xs shadow-md active:scale-95 transition-all uppercase tracking-wide cursor-pointer"
              >
                Add
              </button>
            </div>

            {/* Text Section */}
            <div className="flex-1 min-w-0">
              
              {/* Veg / Non-Veg badge */}
              <div className="flex items-center gap-1.5 mb-1">
                {item.card.info.isVeg === 1 ? (
                  <span className="w-4 h-4 border border-green-600 flex items-center justify-center rounded-sm p-0.5">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  </span>
                ) : (
                  <span className="w-4 h-4 border border-red-600 flex items-center justify-center rounded-sm p-0.5">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  </span>
                )}
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {item.card.info.isVeg === 1 ? "Veg" : "Non-Veg"}
                </span>
              </div>

              <h2 className="font-extrabold text-gray-800 text-base md:text-lg mb-1 leading-snug">
                {item.card.info.name}
              </h2>

              <p className="font-black text-gray-900 text-sm mb-2">
                ₹{(item.card.info.defaultPrice || item.card.info.price) / 100}
              </p>

              {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                <div className="flex items-center gap-1 text-xs mb-2">
                  <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                    ★ {item.card.info.ratings.aggregatedRating.rating}
                  </span>
                  <span className="text-gray-400 font-semibold">
                    ({item.card.info.ratings.aggregatedRating.ratingCountV2 || "10+"})
                  </span>
                </div>
              )}

              <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2 max-w-[90%]">
                {item.card.info.description}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}