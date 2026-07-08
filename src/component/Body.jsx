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
  const isFiltered = datafilter.length > 0;

  if (!swiggydata?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50/50">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-gray-500">Finding restaurants near you...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">

      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="font-black text-2xl text-gray-800 tracking-tight">
          Restaurants with online food delivery in Belgaum
        </h2>
        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg w-max">
          Showing {datafilter.length > 0 ? datafilter.length : swiggydata.length} places
        </span>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/80">
        
        {/* Buttons */}
        <div className="flex items-center gap-3">
          {/* Rating Button */}
          <button
            onClick={handleclick}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-xl border transition-all duration-300 cursor-pointer shadow-sm ${
              isFiltered
                ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/30"
            }`}
          >
            ⭐ Rating 4.1+
          </button>

          {/* Reset Button */}
          <button
            onClick={handlereset}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-500 hover:text-red-500 hover:bg-red-50/50 border border-gray-200 hover:border-red-200 text-sm font-bold rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Search & Clock Wrapper */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[240px] max-w-md flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              value={inputdata}
              type="search"
              placeholder="Search restaurants..."
              onChange={(e) => handleinput(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-gray-50/50 focus:bg-white"
            />
          </div>

          {/* Clock */}
          <Clock />
        </div>

      </div>

      {/* Restaurant Cards */}
      <RestraurentCard swiggydata={swiggydata} datafilter={datafilter} />

    </div>
  );
}