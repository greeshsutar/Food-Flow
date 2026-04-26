import { useEffect, useState } from "react";
import axios from "axios";

export default function UseApi() {
const [apidata, setapidata] = useState([]);
  useEffect(() => {
    async function handleData() {
      try {
     const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/restaurants`);
setapidata(response.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
// better
      } catch (error) {
        console.log(error);
        setapidata([])

      }
    }

    handleData();
  }, []);

  return apidata;
}
