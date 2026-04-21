export default function Searchcom({ swiggydata, setinputdata }) {  // ✅ destructure props

  function handleinput(searchText) {
    let newfilter = swiggydata.filter((item) =>
      item.info.name.toLowerCase().includes(searchText.toLowerCase()) // ✅ case insensitive
    );
    setinputdata(newfilter);
  }

  return (
    <div className="flex items-center justify-center my-4">
      <div className="relative w-full max-w-md">
        {/* Search Icon */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          🔍
        </span>
        <input
          type="search"
          placeholder="Search for restaurants..."
          onChange={(e) => handleinput(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm"
        />
      </div>
    </div>
  );
}