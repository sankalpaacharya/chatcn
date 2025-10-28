"use client";
import {
  Bluetooth,
  Wifi,
  BatteryFull,
  SunMedium,
  Clock,
  Calendar,
} from "lucide-react";

const Page = () => {
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
    <div className="flex justify-center items-center h-screen text-[#e78284]">
      <div className="flex border border-[#e78284]/40 w-[80%] max-w-5xl shadow text-[#e78284] rounded-lg justify-between items-center px-4 py-2">
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
    </div>
  );
};

export default Page;
