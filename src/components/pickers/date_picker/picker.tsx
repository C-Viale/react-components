import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { DayView } from "../views/day_view";
import { MonthView } from "../views/month_view";
import { YearView } from "../views/year_view";

type View = "day" | "month" | "year";

interface PickerProps {
  onSelect(value: string): void;
  min?: string;
  max?: string;
  lastSelectedDate: Dayjs;
  selected: boolean;
}

export function Picker({ onSelect, min, max, lastSelectedDate }: PickerProps) {
  const [view, setView] = useState<View>("day");

  const [year, setYear] = useState(lastSelectedDate.year());
  const [month, setMonth] = useState(lastSelectedDate.month() + 1);

  const selectedMonth = dayjs()
    .year(year)
    .month(month - 1);

  const onYearSelect = (value: number) => {
    setYear(value);
    setView("month");
  };

  const onMonthSelect = (value: number) => {
    setMonth(value);
    setView("day");
  };

  const handleChangeView = (value: string) => {
    setView(value as View);
  };

  const minData = min ? dayjs(min).startOf("day") : null;
  const maxData = max ? dayjs(max).endOf("day") : null;

  return (
    <div className="picker__container">
      {view === "day" && (
        <DayView
          selected
          lastSelectedDate={lastSelectedDate}
          selectedMonth={selectedMonth}
          setMonth={setMonth}
          onSelect={onSelect}
          setView={handleChangeView}
          min={minData}
          max={maxData}
        />
      )}
      {view === "month" && (
        <MonthView
          year={year}
          setYear={setYear}
          setView={handleChangeView}
          onSelect={onMonthSelect}
          min={minData}
          max={maxData}
          lastSelectedMonth={lastSelectedDate}
          selected
        />
      )}
      {view === "year" && (
        <YearView
          selected
          initialYear={lastSelectedDate}
          min={minData?.year()}
          max={maxData?.year()}
          onSelect={onYearSelect}
        />
      )}
    </div>
  );
}
