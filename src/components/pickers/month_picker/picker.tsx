import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { MonthView } from "../views/month_view";
import { YearView } from "../views/year_view";

interface PickerProps {
  onSelect(value: string): void;
  min?: string;
  max?: string;
  lastSelectedMonth: Dayjs;
  selected: boolean;
}

export function Picker({ onSelect, min, max, lastSelectedMonth, selected }: PickerProps) {
  const [view, setView] = useState("month");
  const [year, setYear] = useState(lastSelectedMonth.year());

  const minData = min ? dayjs(min) : null;
  const maxData = max ? dayjs(max) : null;

  const onYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    setView("month");
  };

  const onMonthSelect = (value: number) => {
    onSelect(`${year}-${String(value).padStart(2, "0")}`);
  };

  return (
    <div className="picker__container">
      {view === "month" && (
        <MonthView
          year={year}
          min={minData}
          max={maxData}
          setYear={setYear}
          setView={setView}
          onSelect={onMonthSelect}
          selected={selected}
          lastSelectedMonth={lastSelectedMonth}
        />
      )}
      {view === "year" && (
        <YearView
          selected={selected}
          initialYear={lastSelectedMonth}
          min={minData?.year()}
          max={maxData?.year()}
          onSelect={onYearSelect}
        />
      )}
    </div>
  );
}
