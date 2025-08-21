"use client";
import { Tool, ToolStateBadge } from "@/registry/new-york/tool/tool";

export default function Page() {
  return (
    <div className="p-4 flex justify-center">
      <Tool
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
        <ToolStateBadge type="COMPLETED">Completed</ToolStateBadge>
      </Tool>
    </div>
  );
}
