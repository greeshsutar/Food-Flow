import { useEffect, useState } from "react";

export default function Clock() {
  const [clock, setclock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    let newclock = setTimeout(() => {
      setclock(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearTimeout(newclock);
  }, [clock]);

  return (
    <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-4 py-2 rounded-xl">
      <span className="text-lg">🕐</span>
      <span className="text-sm font-semibold text-gray-700 tracking-wide">
        {clock}
      </span>
    </div>
  );
}