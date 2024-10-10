import { Radio } from "@components/radio";
import { classNames } from "@functions/classNames";
import "./styles.css";

export type RadioGroupOption = { label: string; value: string; disabled?: boolean };

interface RadioGroupProps {
  name?: string;
  label?: string;
  layout?: "vertical" | "horizontal";
  options: RadioGroupOption[];
  value?: string;
  onChange?(value: string): void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  disabled,
  label,
  layout = "horizontal",
  onChange,
  required,
  className,
}: RadioGroupProps) {
  return (
    <div className={classNames("radio-group__container", className)}>
      {label && <label className="radio-group__label">{label}</label>}
      <div className={classNames("radio-group__options", layout)}>
        {options.map((option) => (
          <Radio
            required={required}
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            disabled={option.disabled || disabled}
            checked={value ? option.value === value : undefined}
            onClick={(e) => {
              if (e.currentTarget.checked) onChange?.(option.value);
              else onChange?.("");
            }}
          />
        ))}
      </div>
    </div>
  );
}
