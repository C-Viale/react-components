import { classNames } from "@functions/classNames";
import { format } from "@functions/format";
import { renderIcon } from "@functions/renderIcon";
import { useForwardedRef } from "@hooks/useForwardedRef";
import { useToogle } from "@hooks/useToggle";
import React, { ComponentType, ReactNode } from "react";
import { PiEye, PiEyeSlash, PiX } from "react-icons/pi";
import "./styles.css";

type InputMask = "alphanumeric" | "number" | "hours" | "upperCase";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  label?: string;
  type?: "text" | "password" | "email" | "number" | "month" | "date";
  errorMessage?: string;
  clearable?: boolean;
  loading?: boolean;
  mask?: InputMask;
  leftIcon?: ComponentType | ReactNode;
  rightIcon?: ComponentType | ReactNode;
  onClear?(): void;
}

export function Input({
  id,
  ref,
  label,
  type,
  disabled,
  leftIcon,
  rightIcon,
  className,
  errorMessage,
  mask,
  clearable,
  loading,
  onChange,
  onKeyDown,
  onWheel,
  onClear,
  ...props
}: InputProps) {
  const innerRef = useForwardedRef(ref);
  const [showPassword, toggleShowPassword] = useToogle(false);

  const isDisabled = disabled || loading;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    event.preventDefault();
    if (mask) event.target.value = format(event.target.value, mask);
    onChange?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    if (event.key === "Enter") event.stopPropagation();
    onKeyDown?.(event);
  };

  const clear = () => {
    if (isDisabled) return;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    )?.set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(innerRef.current, "");
    }

    innerRef?.current?.dispatchEvent(new Event("input", { bubbles: true }));
    innerRef?.current?.dispatchEvent(new Event("change", { bubbles: true }));
    onClear?.();
  };

  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") event.currentTarget.blur();
    onWheel?.(event);
  };

  return (
    <div className="cvl-input-container">
      {label && (
        <label htmlFor={id} className="cvl-input-label">
          {label}
        </label>
      )}

      <div className="cvl-input-wrapper">
        {leftIcon && (
          <span className="cvl-input-left-icon">{renderIcon(leftIcon)}</span>
        )}
        <input
          id={id}
          ref={innerRef}
          type={showPassword ? "text" : type}
          onChange={handleChange}
          className={classNames("cvl-input", className)}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          disabled={isDisabled}
          {...props}
        />

        {clearable && !isDisabled && (
          <span className="cvl-input-clear" onClick={clear}>
            <PiX size={14} />
          </span>
        )}

        {loading ? (
          <span className="cvl-input-right-icon">
            <div className="cvl-input-throbber" />
          </span>
        ) : (
          <>
            {type === "password" && (
              <span
                className="cvl-input-password-icon"
                onClick={toggleShowPassword}
              >
                {showPassword ? <PiEyeSlash /> : <PiEye />}
              </span>
            )}
            {type !== "password" && rightIcon && (
              <span className="cvl-input-right-icon">
                {renderIcon(rightIcon)}
              </span>
            )}
          </>
        )}
      </div>
      {errorMessage && (
        <div className="cvl-input-error-message">{errorMessage}</div>
      )}
    </div>
  );
}
