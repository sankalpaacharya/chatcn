"use client";
import {
  Bluetooth,
  Wifi,
  BatteryFull,
  SunMedium,
  Clock,
  Calendar,
} from "lucide-react";

const StatusBarPreview = () => {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });

  const actions = [
    { value: "30%", icon: SunMedium },
    { value: "100%", icon: BatteryFull },
    { value: "Wi-Fi", icon: Wifi },
    { value: "BT", icon: Bluetooth },
    { value: time, icon: Clock },
    { value: date, icon: Calendar },
  ];

  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <div className="flex border border-[#e78284]/40 w-full max-w-5xl shadow text-[#e78284] rounded-lg justify-between items-center px-4 py-2">
        <div className="flex items-center">
          {numbers.map((num) => (
            <div
              key={num}
              className={`px-3 py-1 ${
                num === 1 ? "bg-[#e78284]/30" : ""
              } text-center rounded-md`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          {actions.map(({ value, icon: Icon }, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <Icon className="size-4" />
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex w-full max-w-5xl justify-between items-center px-4 py-2 rounded-2xl shadow-md backdrop-blur-md"
        style={{
          background:
            "linear-gradient(145deg, rgba(49,50,68,0.6), rgba(30,30,46,0.6))",
          border: "1px solid #313244",
          color: "#cdd6f4",
        }}
      >
        <div className="flex items-center gap-2">
          {numbers.map((num) => (
            <div
              key={num}
              className={`px-3 py-1 rounded-md text-center transition-all duration-200 cursor-pointer ${
                num === 1
                  ? "bg-[#cba6f7]/30 text-[#cba6f7] shadow-inner"
                  : "hover:bg-[#585b70]/40"
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-[#bac2de]">
          {actions.map(({ value, icon: Icon }, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 hover:text-[#f5e0dc] transition-colors duration-200"
            >
              <Icon className="size-4" />
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusBarPreview;
