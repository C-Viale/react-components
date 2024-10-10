import { arrayRange } from "@functions/math";
import { classNames } from "@functions/classNames";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { PickerHeader } from "./picker_header";

interface YearViewProps {
  initialYear: Dayjs;
  selected: boolean;
  min?: number;
  max?: number;
  onSelect?(value: number): void;
}

export function YearView({
  initialYear,
  selected,
  min,
  max,
  onSelect,
}: YearViewProps) {
  const [innerYear, setInnerYear] = useState(initialYear.year());
  const yearStr = innerYear.toString();
  const firstYear = Number(yearStr.slice(0, yearStr.length - 1) + "0");
  const lastYear = firstYear + 9;
  const years = arrayRange(firstYear, lastYear);

  const isDisabled = (val: number) => {
    let disable = false;

    if (min) disable = val < min;
    if (max && !disable) disable = val > max;

    return disable;
  };

  return (
    <>
      <PickerHeader
        text={`${firstYear} - ${lastYear}`}
        left={{
          disabled: min ? firstYear - 1 < min : false,
          handler: () => setInnerYear((prev) => prev - 10),
        }}
        right={{
          disabled: max ? lastYear + 1 > max : false,
          handler: () => setInnerYear((prev) => prev + 10),
        }}
      />

      <div className="picker__year__container">
        {years.map((item) => (
          <button
            key={item}
            type="button"
            className={classNames("picker__year__item", {
              selected: selected && initialYear.year() === item,
              today: dayjs().year() === item,
            })}
            onClick={() => onSelect?.(item)}
            disabled={isDisabled(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}
