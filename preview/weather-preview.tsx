import React from "react";
import WeatherCard from "@/components/chatcn/tool-call/weather";

export default function WeatherCardPreview() {
  return (
    <div className="flex justify-center">
      <WeatherCard
        currentTemp={18}
        condition="Partly Cloudy"
        location="New York, USA"
        weeklyForecast={[
          { day: "Wed", tempHigh: 20, tempLow: 12, icon: "⛅" },
          { day: "Thu", tempHigh: 17, tempLow: 10, icon: "☁️" },
          { day: "Fri", tempHigh: 19, tempLow: 11, icon: "🌧️" },
          { day: "Sat", tempHigh: 22, tempLow: 14, icon: "☀️" },
          { day: "Sun", tempHigh: 21, tempLow: 13, icon: "☀️" },
          { day: "Mon", tempHigh: 19, tempLow: 12, icon: "⛅" },
          { day: "Tue", tempHigh: 18, tempLow: 11, icon: "☁️" },
        ]}
        humidity={72}
        windSpeed={15}
        feelsLike={16}
      />
    </div>
  );
}
