import { useEffect, useState } from "react";
import axios from "axios";

export default function UseApi() {
const [apidata, setapidata] = useState([]);
  useEffect(() => {
    async function handleData() {
      try {
        const url =
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=15.796320490637022&lng=74.47427418082952&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

        const response = await axios.get(url);

        // console.log(response.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants[0].info.cuisines);
        //  console.log(response.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants[0].info.locality)
        // console.log(response.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants[0].info.name);
        //  console.log(response.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants[0].info.sla.slaString);
        //   console.log(response.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants[0].info.avgRating);
       setapidata(response.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants); // better
      } catch (error) {

      }
    }

    handleData();
  }, []);

  return apidata;
}
