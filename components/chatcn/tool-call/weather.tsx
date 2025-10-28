import React from "react";
import { MapPin } from "lucide-react";

interface WeatherCardProps {
  currentTemp: number;
  condition: string;
  location: string;
  weeklyForecast: {
    day: string;
    tempHigh: number;
    tempLow: number;
    icon: string;
  }[];
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}
// need to fix this
const WeatherCard: React.FC<WeatherCardProps> = ({
  currentTemp,
  condition,
  location,
  weeklyForecast,
  humidity,
  windSpeed,
  feelsLike,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border bg-card text-card-foreground shadow-xs">
        <div className="h-32 bg-gradient-to-t relative border-b pb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full p-3 text-4xl font-bold">
              {currentTemp}°C
            </div>
          </div>
          <div className="absolute top-2 left-4 text-md font-medium text-foreground flex items-center gap-1">
            <MapPin size={18} />
            {location}
          </div>
          <div className="absolute bottom-2 right-4 text-lg font-medium text-foreground">
            {condition}
          </div>
        </div>
        <div className="p-4 grid grid-cols-7 gap-2">
          {weeklyForecast.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-muted-foreground">{day.day}</p>
              <div className="text-2xl">{day.icon}</div>
              <p className="text-xs text-muted-foreground">
                {day.tempHigh}°/{day.tempLow}°
              </p>
            </div>
          ))}
        </div>
        <div className="p-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center">
              💧 Humidity
            </p>
            <p className="text-lg font-medium">{humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center">
              💨 Wind
            </p>
            <p className="text-lg font-medium">{windSpeed} km/h</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center">
              🌡️ Feels Like
            </p>
            <p className="text-lg font-medium">{feelsLike}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
