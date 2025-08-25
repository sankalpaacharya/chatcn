import React from "react";
import { Tool, ToolStateBadge } from "@/registry/new-york/tool";

export default function ToolStatePreview() {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <Tool
        name="WEATHER_FETCH"
        state="LOADING"
        errorText="Please prodive all the necessary details"
      >
        <ToolStateBadge />
      </Tool>
      <Tool
        name="WEATHER_FETCH"
        state="ERROR"
        errorText="Please prodive all the necessary details"
      >
        <ToolStateBadge />
      </Tool>

      <Tool
        name="WEATHER_FETCH"
        state="COMPLETED"
        input={{
          city: "Kathmandu",
          units: "metric",
          forecast_days: 3,
        }}
        output={{
          forecast: [
            {
              day: "Monday",
              temperature: "28°C",
              condition: "Sunny",
            },
            {
              day: "Tuesday",
              temperature: "26°C",
              condition: "Partly Cloudy",
            },
            {
              day: "Wednesday",
              temperature: "24°C",
              condition: "Light Rain",
            },
          ],
        }}
      >
        <ToolStateBadge />
      </Tool>
    </div>
  );
}
