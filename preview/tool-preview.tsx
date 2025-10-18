import { Tool, ToolStateBadge } from "@/components/chatcn/tool";

export default function ToolPreview() {
  return (
    <div className="flex justify-center">
      <Tool
        name="WEATHER_FETCH"
        state="COMPLETED"
        errorText="Please prodive all the necessary details"
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
