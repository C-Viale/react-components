import { classNames } from "@functions/classNames";
import { inputFormat } from "@functions/format";
import { renderIcon } from "@functions/renderIcon";
import { useForwardedRef } from "@hooks/useForwardedRef";
import { useToogle } from "@hooks/useToggle";
import React, { forwardRef, ReactNode } from "react";
import { PiEye, PiEyeSlash, PiX } from "react-icons/pi";
import "./styles.css";

export type InputMaskType =
  | "alphanumeric"
  | "cep"
  | "cpf"
  | "cnpj"
  | "number"
  | "phone"
  | "hours"
  | "ip"
  | "upperCase";

type IconType = React.ComponentType<{ className?: string }>;

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  leftIcon?: IconType | ReactNode;
  rightIcon?: IconType | ReactNode;
  type?: "text" | "password" | "email" | "number" | "month" | "date";
  errorMessage?: string;
  mask?: InputMaskType;
  clearable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type,
      leftIcon,
      rightIcon,
      className,
      errorMessage,
      mask,
      onChange,
      onKeyDown,
      id,
      name,
      placeholder = "",
      clearable,
      ...props
    },
    ref
  ) => {
    const innerRef = useForwardedRef(ref);
    const [showPassword, toggleShowPassword] = useToogle(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.target.value = inputFormat(event.target.value, mask);
      onChange?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.stopPropagation();
      }
      onKeyDown?.(event);
    };

    const clear = () => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      )?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(innerRef.current, "");
      }
      innerRef.current!.dispatchEvent(new Event("input", { bubbles: true }));
      innerRef.current!.dispatchEvent(new Event("change", { bubbles: true }));
    };

    return (
      <div className="input__wrapper">
        {label && (
          <label htmlFor={id} className="input__label">
            {label}
          </label>
        )}

        <div className="input__container">
          {leftIcon && (
            <span className="input__left_icon">{renderIcon(leftIcon)}</span>
          )}
          <input
            id={id}
            name={name}
            ref={innerRef}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            onChange={handleChange}
            className={classNames("input", className)}
            onKeyDown={handleKeyDown}
            data-errormessage={errorMessage}
            {...props}
          />

          {clearable && (
            <span className="input__clear_button" onClick={clear}>
              <PiX size={14} />
            </span>
          )}

          {type === "password" && (
            <span className="input__password_icon" onClick={toggleShowPassword}>
              {showPassword ? <PiEyeSlash /> : <PiEye />}
            </span>
          )}

          {type !== "password" && rightIcon && (
            <span className="input__right_icon">{renderIcon(rightIcon)}</span>
          )}
        </div>
        {errorMessage && (
          <div className="input__helper_container">{errorMessage}</div>
        )}
      </div>
    );
  }
);
