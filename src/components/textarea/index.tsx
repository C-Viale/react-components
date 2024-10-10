import { useForwardedRef } from "@hooks/useForwardedRef";
import { classNames } from "@functions/classNames";
import { renderIcon } from "@functions/renderIcon";
import React, { forwardRef, ReactNode, useState } from "react";
import "./styles.css";

type IconType = React.ComponentType<{ className?: string }>;

interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  leftIcon?: IconType | ReactNode;
  rightIcon?: IconType | ReactNode;
  errorMessage?: string;
  resizable?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      leftIcon,
      rightIcon,
      className,
      errorMessage,
      onChange,
      onKeyDown,
      id,
      name,
      placeholder = "",
      resizable,
      rows = 3,
      value,
      maxLength,
      ...props
    },
    ref
  ) => {
    const innerRef = useForwardedRef(ref);
    const [length, setLength] = useState(value?.toString().length ?? 0);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        event.stopPropagation();
      }
      onKeyDown?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      if (maxLength !== undefined) {
        setLength(event.target.value.length);
      }
      onChange?.(event);
    };

    return (
      <div className="textarea__wrapper">
        {label && (
          <label htmlFor={id} className="textarea__label">
            {label}
          </label>
        )}

        {maxLength && (
          <div className="absolute right-0 top-3 text-xs text-neutral-400">
            {length} / {maxLength}
          </div>
        )}
        <div className="textarea__container">
          {leftIcon && (
            <span className="textarea__left_icon">{renderIcon(leftIcon)}</span>
          )}
          <textarea
            id={id}
            name={name}
            ref={innerRef}
            placeholder={placeholder}
            className={classNames(
              "textarea",
              resizable && "resizable",
              className
            )}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            rows={rows}
            maxLength={maxLength}
            value={value}
            {...props}
          />

          {rightIcon && (
            <span className="textarea__right_icon">
              {renderIcon(rightIcon)}
            </span>
          )}
        </div>
        {errorMessage && (
          <div className="textarea__helper_container">{errorMessage}</div>
        )}
      </div>
    );
  }
);
