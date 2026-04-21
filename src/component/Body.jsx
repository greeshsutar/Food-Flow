import { useState } from "react";
import RestraurentCard from "./RestraurentCard";
import UseApi from "./UseApi";
import Clock from "./Clock";

export default function Body() {
  const swiggydata = UseApi();
  const [datafilter, setdatafilter] = useState([]);
  const [inputdata, setinputdata] = useState("");

  function handleclick() {
    if (!swiggydata?.length) return;
    setdatafilter(swiggydata.filter((item) => item.info.avgRating >= 4.1));
  }

  function handlereset() {
    setdatafilter([]);
    setinputdata("");
  }

  function handleinput(searchText) {
    setinputdata(searchText);
    setdatafilter(
      swiggydata.filter((item) =>
        item.info.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }
if (!swiggydata?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-400">Finding restaurants near you...</p>
      </div>
    );
  }
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-4">

      {/* Title */}
      <h2 className="font-bold text-xl text-gray-800 mb-4">
        Restaurants with online food delivery in Belgaum
      </h2>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">

        {/* Rating Button */}
        <button
          onClick={handleclick}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          ⭐ Rating 4.1+
        </button>

        {/* Reset Button */}
        <button
          onClick={handlereset}
          className="px-4 py-2 border border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 text-sm font-semibold rounded-lg transition-colors"
        >
          Reset
        </button>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            value={inputdata}
            type="search"
            placeholder="Search restaurants..."
            onChange={(e) => handleinput(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          />
        </div>

        {/* Clock */}
        <Clock />

      </div>

      {/* Restaurant Cards */}
      <RestraurentCard swiggydata={swiggydata} datafilter={datafilter} />

    </div>
  );
}