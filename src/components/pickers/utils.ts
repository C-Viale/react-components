export function between(value: number, min?: number | null, max?: number | null) {
  let isBetween = false;

  if (min == null && max == null) {
    isBetween = true;
  } else if (min == null && max != null) {
    isBetween = value <= max;
  } else if (min != null && max == null) {
    isBetween = value >= min;
  } else {
    isBetween = value >= min! && value <= max!;
  }

  return isBetween;
}

export type MonthPickerLimit = { year: number; month: number };
export type DatePickerLimit = { year: number; month: number; day: number };

export function checkMinMonth(current: MonthPickerLimit, min?: MonthPickerLimit | null) {
  if (current.year < min!.year) return true;
  if (current.year === min!.year && current.month < min!.month) return true;
  return false;
}

export function checkMaxMonth(current: MonthPickerLimit, max?: MonthPickerLimit | null) {
  if (current.year > max!.year) return true;
  if (current.year === max!.year && current.month > max!.month) return true;
  return false;
}

export function splitDate(date: string) {
  const [year, month, day] = date.split(/-/g);
  return { year: +year, month: +month, day: +day };
}
