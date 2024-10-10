import { classNames } from "@functions/classNames";
import { renderIcon } from "@functions/renderIcon";
import { useForwardedRef } from "@hooks/useForwardedRef";
import React, { forwardRef, ReactNode } from "react";
import { PiCaretDown, PiX } from "react-icons/pi";
import "./styles.css";

type IconType = React.ComponentType<{ className?: string }>;

export type SelectOption = { label: string; value: string | number };

interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  label?: string;
  leftIcon?: IconType | ReactNode;
  rightIcon?: IconType | ReactNode;
  errorMessage?: string;
  width?: string | number;
  placeholder?: string;
  options?: SelectOption[];
  clearable?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      leftIcon,
      rightIcon,
      className,
      errorMessage,
      onKeyDown,
      id,
      name,
      placeholder,
      clearable,
      options = [],
      width,
      ...props
    },
    ref
  ) => {
    const innerRef = useForwardedRef(ref);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLSelectElement>) => {
      if (event.key === "Enter") {
        event.stopPropagation();
      }
      onKeyDown?.(event);
    };

    const clear = () => {
      const nativeSelectValueSetter = Object.getOwnPropertyDescriptor(
        HTMLSelectElement.prototype,
        "value"
      )?.set;

      if (nativeSelectValueSetter) {
        nativeSelectValueSetter.call(innerRef.current, "");
      }

      innerRef.current!.dispatchEvent(new Event("change", { bubbles: true }));
    };

    return (
      <div className="select__wrapper" style={{ width }}>
        {label && (
          <label htmlFor={id} className="select__label">
            {label}
          </label>
        )}

        <div className="select__container">
          {leftIcon && (
            <span className="select__left_icon">{renderIcon(leftIcon)}</span>
          )}
          <select
            id={id}
            name={name}
            ref={innerRef}
            className={classNames("select", className)}
            onKeyDown={handleKeyDown}
            {...props}
          >
            {placeholder && (
              <option value="" className="options">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="options"
              >
                {option.label}
              </option>
            ))}
          </select>
          {!clearable && rightIcon && (
            <span className="select__right_icon">{renderIcon(rightIcon)}</span>
          )}
          {clearable && (
            <span className="select__clear_button" onClick={clear}>
              <PiX size={14} />
            </span>
          )}
          <span className="select__caret">
            <PiCaretDown />
          </span>
        </div>
        {errorMessage && (
          <div className="select__helper_container">{errorMessage}</div>
        )}
      </div>
    );
  }
);
