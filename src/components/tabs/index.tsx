import { classNames } from "@functions/classNames";
import { ReactNode, useState } from "react";
import "./styles.css";

export type TabOption = { label?: string; value: string; icon?: ReactNode };

interface TabsProps {
  options: TabOption[];
  onChange?(value: string): void;
  value?: string;
}

export function Tabs({ value, options, onChange }: TabsProps) {
  const [selected, setSelected] = useState(options[0]?.value || "");

  if (value && value !== selected) {
    setSelected(value);
  }

  const handleClick = (nextValue: string) => {
    if (value == null) {
      setSelected(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <div className="tabs__container" key={value}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={classNames("tabs__item", selected === option.value && "selected")}
          onClick={() => handleClick(option.value)}
        >
          {option.icon && <div className="tabs__item-icon">{option.icon}</div>}
          {option.label && <div>{option.label}</div>}
        </button>
      ))}
    </div>
  );
}
