import { Input } from "@components/input";
import { classNames } from "@functions/classNames";
import { useClickOutside } from "@hooks/useClickOutside";
import { useForwardedRef } from "@hooks/useForwardedRef";
import dayjs from "dayjs";
import { forwardRef, ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PiCalendarBlank } from "react-icons/pi";
import "../styles.css";
import { YearView } from "../views/year_view";

type IconType = React.ComponentType<{ className?: string }>;
type PopoverPosition = "top" | "bottom";

interface YearPickerProps extends React.ComponentPropsWithoutRef<"input"> {
  id?: string;
  label?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  clearable?: boolean;
  errorMessage?: string;
  leftIcon?: IconType | ReactNode;
  rightIcon?: IconType | ReactNode;
  popoverPosition?: PopoverPosition;
  min?: number;
  max?: number;
}

export const YearPicker = forwardRef<HTMLInputElement, YearPickerProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      clearable,
      className,
      errorMessage,
      leftIcon,
      rightIcon,
      popoverPosition = "bottom",
      onKeyDown,
      min,
      max,
      onChange,
      value,
      ...props
    },
    ref,
  ) => {
    const innerRef = useForwardedRef(ref);

    const [open, setOpen] = useState(false);
    const [tooltipStyle, setTooltipStyle] = useState({});
    const [selected, setSelected] = useState(!!value);
    const [lastSelectedYear, setLastSelectedYear] = useState(() => {
      const val = value ? dayjs(String(value)) : dayjs();

      if (max && val.isAfter(max, "day")) {
        return dayjs(max).startOf("day");
      }

      if (min && val.isBefore(min, "day")) {
        return dayjs(min).startOf("day");
      }

      return val;
    });

    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    useClickOutside(popoverRef, () => {
      if (open) setOpen(false);
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.stopPropagation();
      }
      onKeyDown?.(event);
    };

    const triggerEvent = (nextValue: string) => {
      if (innerRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(innerRef.current, nextValue);
        }

        innerRef.current.dispatchEvent(new Event("input", { bubbles: true }));
        innerRef.current.dispatchEvent(new Event("change", { bubbles: true }));
      }
    };

    const calculatePosition = () => {
      if (triggerRef.current && popoverRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let top, left;

        switch (popoverPosition) {
          case "top":
            top = triggerRect.top - popoverRect.height - 90;
            left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;

            // Adjust if the popover overflows the viewport
            if (top < 0) top = triggerRect.bottom; // Flip to bottom
            if (left < 0) left = 0; // Adjust to left edge
            if (left + popoverRect.width > viewportWidth) left = viewportWidth - popoverRect.width; // Adjust to right edge
            break;

          case "bottom":
            top = triggerRect.bottom;
            left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;

            // Adjust if the popover overflows the viewport
            if (top + popoverRect.height > viewportHeight) top = triggerRect.top - popoverRect.height; // Flip to top
            if (left < 0) left = 0; // Adjust to left edge
            if (left + popoverRect.width > viewportWidth) left = viewportWidth - popoverRect.width; // Adjust to right edge
            break;

          default:
            top = triggerRect.bottom;
            left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
            break;
        }

        setTooltipStyle({
          top: `${top}px`,
          left: `${triggerRect.left}px`,
        });
      }
    };

    const togglePopover = () => {
      setOpen((prev) => !prev);
      calculatePosition();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value) {
        setLastSelectedYear(dayjs(event.target.value));
        setSelected(true);
      } else {
        setLastSelectedYear(dayjs());
        setSelected(false);
      }

      onChange?.(event);
    };

    const onSelect = (nextValue: string) => {
      triggerEvent(nextValue);
      setOpen(false);
    };

    const container = document.getElementById("popover_portal");

    if (!container) return null;

    return (
      <div className="year-picker__container" ref={triggerRef}>
        <Input
          id={id}
          name={name}
          label={label}
          ref={innerRef}
          placeholder={placeholder}
          className={classNames("year-picker", className)}
          onClick={togglePopover}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          onChange={handleChange}
          clearable={clearable}
          rightIcon={rightIcon || PiCalendarBlank}
          leftIcon={leftIcon}
          errorMessage={errorMessage}
          value={value}
          {...props}
          type="number"
        />
        {createPortal(
          <div
            ref={popoverRef}
            className="year-picker__popover"
            style={{
              ...tooltipStyle,
              opacity: open ? 1 : 0,
            }}
          >
            {open && (
              <div className="picker__container">
                <YearView
                  initialYear={lastSelectedYear}
                  selected={selected}
                  min={min}
                  max={max}
                  onSelect={(nextValue) => onSelect(String(nextValue))}
                />
              </div>
            )}
          </div>,
          container,
        )}
      </div>
    );
  },
);
