import { classNames } from "@functions/classNames";
import { dayjsRange, isDateInRange } from "@functions/date";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { Dispatch, SetStateAction } from "react";
import { PickerHeader } from "./picker_header";

dayjs.locale("pt-br");

type View = "day" | "month" | "year";

interface DayViewProps {
  selectedMonth: Dayjs;
  onSelect(value: string): void;
  setMonth: Dispatch<SetStateAction<number>>;
  setView(value: View): void;
  min: Dayjs | null;
  max: Dayjs | null;
  selected: boolean;
  lastSelectedDate: Dayjs;
}

export function DayView({
  selectedMonth,
  setMonth,
  onSelect,
  setView,
  min,
  max,
  lastSelectedDate,
  selected,
}: DayViewProps) {
  const firstDate = selectedMonth.startOf("month").startOf("week");
  const lastDate = selectedMonth.endOf("month").endOf("week");

  const days = dayjsRange(firstDate, lastDate);

  return (
    <>
      <PickerHeader
        text={selectedMonth.format("MMMM / YYYY")}
        left={{
          disabled: min ? selectedMonth.subtract(1, "month").isBefore(min) : false,
          handler: () => setMonth((prev) => prev - 1),
        }}
        middle={() => setView("month")}
        right={{
          disabled: max ? selectedMonth.add(1, "month").isAfter(max) : false,
          handler: () => setMonth((prev) => prev + 1),
        }}
      />

      <div className="picker__day__container">
        <div className="picker__day__name">dom</div>
        <div className="picker__day__name">seg</div>
        <div className="picker__day__name">ter</div>
        <div className="picker__day__name">qua</div>
        <div className="picker__day__name">qui</div>
        <div className="picker__day__name">sex</div>
        <div className="picker__day__name">sab</div>
        {days.map((day) => (
          <button
            type="button"
            key={day.format("YYYY-MM-DD")}
            onClick={() => onSelect(day.format("YYYY-MM-DD"))}
            className={classNames("picker__day__item", {
              today: day.isSame(dayjs(), "day"),
              "outside-month": !day.isSame(selectedMonth, "month"),
              selected: selected && day.isSame(lastSelectedDate, "day"),
            })}
            disabled={!isDateInRange(day, min, max)}
          >
            {day.format("DD")}
          </button>
        ))}
      </div>
    </>
  );
}
