
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calendarCode = `
"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, ChevronRight, ChevronLeft } from "lucide-react";

type Props = {
  title: string;
  description?: string;
};

export default function Heatmap({ title, description }: Props) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const numberOfDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Calendar size={20} className="text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              {description && (
                <CardDescription className="text-sm mt-1 text-muted-foreground">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <h3 className="text-md font-medium">
            {months[selectedMonth]} {selectedYear}
          </h3>
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 hover:bg-muted rounded-md transition-colors"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="p-1.5 hover:bg-muted rounded-md transition-colors"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-7 gap-1 text-xs text-center mb-3 text-muted-foreground font-medium">
          {days.map((day, i) => (
            <div key={i} className="py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: numberOfDays + firstDayOfMonth }, (_, i) =>
            i < firstDayOfMonth ? (
              <div key={i} className="aspect-square"></div>
            ) : (
              <DayCard
                key={i}
                day={i - firstDayOfMonth + 1}
                isToday={isToday(i - firstDayOfMonth + 1)}
              />
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function DayCard({ day, isToday = false }: { day: number; isToday?: boolean }) {
  return (
    <div
      className={\`
        aspect-square min-w-[2rem] rounded-md flex items-center justify-center 
        text-xs font-medium transition-all duration-200 cursor-pointer
        hover:bg-muted/80 hover:scale-105
        \${isToday ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/50 text-muted-foreground hover:text-foreground"}
      \`}
    >
      {day}
    </div>
  );
}
`;