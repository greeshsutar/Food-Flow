import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "./utils/CartSlice";

export default function Menu() {

  let {id} = useParams();
  console.log(id);
  const [restdetail, setrestdetail] = useState([]);

  useEffect(() => {
    async function menudata() {
      try {
        let data = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=15.796320490637022&lng=74.47427418082952&restaurantId=${id}&submitAction=ENTER`;
        let response = await axios.get(data);
        console.log(response.data.data.statusMessage);
        console.log(
          response?.data?.data?.cards?.[5]
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[5]
            ?.card?.card?.itemCards
        );
        const items =
          response?.data?.data?.cards?.[5]
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[5]
            ?.card?.card?.itemCards;
        setrestdetail(items);
      } catch (error) {
        console.log(error);
      }
    }
    menudata();
  }, [id]);

  let dispatchaction = useDispatch();

  function handleaction(item) {
    console.log("Clicked", item);
    console.log(item.card.info.id);
    dispatchaction(addItem(item));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="font-bold text-2xl p-1 mb-4">
        <h1 className="ml-2">Recommended </h1>
      </div>

      {/* Items */}
      {restdetail?.map((item) => (
        <div
          key={item.card.info.id}
          className="flex flex-row-reverse items-start justify-between border-b border-gray-200 py-5 gap-4"
        >

          {/* Image + ADD Button */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
           <img
  className="rounded-2xl w-44 h-44 object-cover"
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
  className="w-44 h-44 rounded-2xl bg-orange-50 flex-col items-center justify-center gap-1"
  style={{ display: "none" }}
>
  <span className="text-4xl">🍽️</span>
  <span className="text-orange-500 font-extrabold text-sm">Food<span className="text-gray-800">Flow</span></span>
</div>
            <button
              onClick={() => handleaction(item)}
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold rounded-xl px-6 py-1.5 text-sm transition-colors cursor-pointer bg-white"
            >
              + ADD
            </button>
          </div>

          {/* Text Section */}
          <div className="mt-3 ml-2 flex-1">
            <h1 className="font-bold text-gray-800 text-base">
              {item.card.info.name}
            </h1>

            <span className="font-bold text-gray-700 text-sm">
              ₹ {(item.card.info.defaultPrice || item.card.info.price) / 100}
            </span>

            <div className="flex items-center gap-1 mt-1">
              <span className="mt-0.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="14" height="14" fill="white"></rect>
                  <path d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z" fill="#116649">
                  </path>
                </svg>
              </span>
              <span className="text-sm text-gray-600">
                {item?.card?.info?.ratings?.aggregatedRating?.rating ?? 0}
              </span>
              <span className="text-sm text-gray-400">
                ({item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 ?? 0})
              </span>
            </div>

            <div className="mt-3">
              <p className="text-sm text-gray-500">{item.card.info.description}</p>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}