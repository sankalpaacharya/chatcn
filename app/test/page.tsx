import React from "react";
import WeatherCard from "@/registry/new-york/weather";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="p-10">
      <WeatherCard location="New York" condition="Partly Cloudy" />
    </div>
  );
}
