"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
  //   CardFooter,
} from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import { Calendar, ChevronRight, ChevronLeft } from "lucide-react";

type Props = { title: string; description?: string };

export default function Heatmap({ title, description }: Props) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const currentYear = now.getFullYear();
  const numberOfDays = new Date(currentYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, selectedMonth, 1).getDay();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex justify-between items-start p-4">
        <div className="flex gap-3 items-start">
          <span className="bg-muted p-2 rounded-full flex items-center justify-center">
            <Calendar size={18} />
          </span>
          <div>
            <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
            {description && (
              <CardDescription className="text-sm mt-1">
                {description}
              </CardDescription>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            className="p-1 hover:bg-muted rounded-full transition"
            onClick={() => setSelectedMonth((prev) => prev - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-medium">{months[selectedMonth]}</span>
          <button
            className="p-1 hover:bg-muted rounded-full transition"
            onClick={() => setSelectedMonth((prev) => prev + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-7 text-xs text-center mb-2 text-muted-foreground">
          {days.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 min-h-[200px]">
          {Array.from({ length: numberOfDays + firstDayOfMonth }, (_, i) =>
            firstDayOfMonth > i ? (
              <div key={i}></div>
            ) : (
              <DayCard key={i} day={i - firstDayOfMonth + 1} />
            )
          )}
        </div>
      </CardContent>

      {/* <Separator /> */}

      {/* <CardFooter className="flex p-4 text-xs text-muted-foreground space-x-3 items-center">
        <span className="font-lg">Less</span>
        <span className="bg-green-800 h-4 w-4 rounded shadow-lg"></span>
        <span className="bg-green-700 h-4 w-4 rounded shadow-lg"></span>
        <span className="bg-green-600 h-4 w-4 rounded shadow-lg"></span>
        <span className="font-lg">More</span>
      </CardFooter> */}
    </Card>
  );
}

function DayCard({ day }: { day: number }) {
  return (
    <div className="aspect-square min-w-[2rem] bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground hover:bg-muted/70 transition">
      {day}
    </div>
  );
}
