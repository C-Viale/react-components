import { classNames } from "@functions/classNames";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { PickerHeader } from "./picker_header";

interface MonthViewProps {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  setView(value: string): void;
  onSelect(value: number): void;
  min?: Dayjs | null;
  max?: Dayjs | null;
  selected: boolean;
  lastSelectedMonth: Dayjs;
}

const months = [
  { description: "Janeiro", shortDescription: "jan", value: 0 },
  { description: "Fevereiro", shortDescription: "fev", value: 1 },
  { description: "Março", shortDescription: "mar", value: 2 },
  { description: "Abril", shortDescription: "abr", value: 3 },
  { description: "Maio", shortDescription: "maio", value: 4 },
  { description: "Junho", shortDescription: "jun", value: 5 },
  { description: "Julho", shortDescription: "jul", value: 6 },
  { description: "Agosto", shortDescription: "ago", value: 7 },
  { description: "Setembro", shortDescription: "set", value: 8 },
  { description: "Outubro", shortDescription: "out", value: 9 },
  { description: "Novembro", shortDescription: "nov", value: 10 },
  { description: "Dezembro", shortDescription: "dez", value: 11 },
];

export function MonthView({
  year,
  setYear,
  setView,
  onSelect,
  min,
  max,
  selected,
  lastSelectedMonth,
}: MonthViewProps) {
  const isDisabled = (month: number) => {
    const current = dayjs(`${year}-${String(month).padStart(2, "0")}`);

    let disable = false;

    if (min) {
      disable = current.isBefore(min, "month");
    }

    if (max && !disable) {
      disable = current.isAfter(max, "month");
    }

    return disable;
  };

  return (
    <>
      <PickerHeader
        text={String(year)}
        left={{
          disabled: min ? year - 1 < min.year() : false,
          handler: () => setYear((prev) => prev - 1),
        }}
        right={{
          disabled: max ? year + 1 > max.year() : false,
          handler: () => setYear((prev) => prev + 1),
        }}
        middle={() => setView("year")}
      />

      <div>
        <div className="picker__month__container">
          {months.map((month) => {
            const current = dayjs(
              `${year}-${String(month.value + 1).padStart(2, "0")}`
            );

            return (
              <button
                key={month.value}
                type="button"
                onClick={() => onSelect(month.value + 1)}
                disabled={isDisabled(month.value + 1)}
                className={classNames("picker__month__item", {
                  today: current.isSame(dayjs(), "month"),
                  selected:
                    selected && current.isSame(lastSelectedMonth, "month"),
                })}
              >
                {month.description}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
