import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export function isDateInRange(
  val: Dayjs,
  minDate: Dayjs | null,
  maxDate: Dayjs | null
) {
  if (!minDate && !maxDate) return true;

  if (minDate && !maxDate) {
    return val.isSameOrAfter(minDate, "day");
  }

  if (!minDate && maxDate) {
    return val.isSameOrBefore(maxDate, "day");
  }

  return val.isBetween(minDate, maxDate, "day", "[]");
}

export function dayjsRange(from: dayjs.ConfigType, to: dayjs.ConfigType) {
  const list = [];
  let current = dayjs(from);

  while (current.isBefore(to)) {
    list.push(current);
    current = current.add(1, "day");
  }
  return list;
}
