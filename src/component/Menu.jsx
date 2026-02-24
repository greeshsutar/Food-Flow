import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "./utils/CartSlice";

export default function Menu() {

  let {id}=useParams();
  console.log(id);
  const [restdetail, setrestdetail] = useState([]);

  useEffect(() => {
    async function menudata() {
      try {
        let data =
          `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=15.796320490637022&lng=74.47427418082952&restaurantId=${id}&submitAction=ENTER`;

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


  // additem
 let dispatchaction =  useDispatch();

  function handleaction(item){
    console.log("Clicked", item);
    console.log(item.card.info.id)
      dispatchaction(addItem(item))
  }

  return (
    <>
      <div className="font-bold text-2xl p-1 mb-2">
        <h1 className="ml-9">Recommended (20)</h1>
      </div>

      {restdetail?.map((item) => {
        return (
          <div className="flex flex-row-reverse items-start  border-b-2   border-gray-300     justify-between p-4">

            {/* Image Section */}
            <div className=" ml-4 flex-shrink-0">
              <img 
                className="rounded-3xl w-56 object-cover mr-10"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}
                alt="pizza photo"
              />
    <div className=" flex justify-center " >   <button className=" border-2 rounded-xl p-1.5  font-bold mr-10 mb-2 -mt-6 w-30   bg-white  text-green-600 cursor-pointer "   onClick={() => handleaction(item)} >ADD</button></div>        
            </div>

            {/* Text Section */}
            <div className="mt-3  ml-6">
              <h1 className="font-bold">
                {item.card.info.name}
              </h1>
    

              <span className="font-bold">
                ₹ {(item.card.info.defaultPrice || item.card.info.price) / 100}
              </span>

              <div className=" flex  ">
                <span className="mt-1.5  mr-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" fillColor="#116649"><rect width="14" height="14" fill="white"></rect><path d="M5.67163 3.99166C6.22068 2.34179 6.49521 1.51686 7 1.51686C7.50479 1.51686 7.77932 2.34179 8.32837 3.99166L8.65248 4.96556H9.60668C11.4122 4.96556 12.315 4.96556 12.4703 5.45302C12.6256 5.94049 11.8893 6.4628 10.4167 7.50744L9.67376 8.03444L9.97544 8.94095C10.5325 10.615 10.8111 11.452 10.4033 11.754C9.99553 12.056 9.27604 11.5457 7.83705 10.5249L7 9.93112L6.16295 10.5249C4.72396 11.5457 4.00447 12.056 3.5967 11.754C3.18893 11.452 3.46747 10.615 4.02456 8.94095L4.04557 8.87783C4.18081 8.47145 4.24843 8.26825 4.18684 8.08006C4.12525 7.89187 3.94958 7.76725 3.59824 7.51802C2.11566 6.46633 1.37437 5.94049 1.52971 5.45302C1.68504 4.96556 2.5878 4.96556 4.39332 4.96556H5.34752L5.67163 3.99166Z" fill="#116649"></path></svg>
                </span>
                <span>
                  {item?.card?.info?.ratings?.aggregatedRating?.rating ?? 0}
                </span>
                   
                <span>
                  ({item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 ?? 0})
                </span>
              </div>
              <div className=" mt-4  flex flex-wrap">
                <p>{item.card.info.description}</p>
              </div>

            </div>

          </div>
        );
      })}
    </>
  );
}