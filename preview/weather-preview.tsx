import React from "react";
import WeatherCard from "@/registry/new-york/weather";

export default function WeatherCardPreview() {
  return (
    <div className="flex justify-center">
      <WeatherCard location="New York" condition="Partly Cloudy" />
    </div>
  );
}
