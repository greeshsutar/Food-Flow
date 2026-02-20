export default function RestraurentCard({ swiggydata, datafilter }) {
  return (
    <>
      {(datafilter.length > 0 ? datafilter : swiggydata).map((item) => {
        return (
          <div className="m-7" key={item.info.id}>
            <img
              className="w-70 h-56 rounded-2xl"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
            />

            <h1 className="font-bold">{item.info.name}</h1>

            <div>
              <span className="font-bold">
                {item.info.avgRating}
              </span>
              <span> 30-40 min</span>

              <div>{item.info.cuisines[0]}</div>
              <div>{item.info.locality}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
