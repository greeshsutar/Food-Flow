import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";

export default function Clock() {
  const [clock, setclock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    let newclock = setTimeout(() => {
      setclock(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearTimeout(newclock);
  }, [clock]);

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-xl text-white shadow-sm shadow-orange-100 hover:shadow-md transition-all duration-300">
      <MdAccessTime className="text-lg animate-pulse" />
      <span className="text-xs font-black tracking-widest font-mono">
        {clock}
      </span>
    </div>
  );
}