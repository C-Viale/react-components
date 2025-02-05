import { classNames } from "@functions/classNames";
import { renderIcon } from "@functions/renderIcon";
import React, { ReactNode } from "react";
import "./styles.css";
import type {
  ButtonVariant,
  ButtonWidth,
  IconType,
  ThrobberPosition,
} from "./types";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  rightIcon?: IconType | ReactNode;
  leftIcon?: IconType | ReactNode;
  loading?: boolean;
  throbberPosition?: ThrobberPosition;
  variant?: ButtonVariant;
  width?: ButtonWidth;
  children?: never;
  label?: string;
}

export function Button({
  className,
  rightIcon,
  leftIcon,
  loading,
  variant = "primary",
  width = "fit",
  throbberPosition = "middle",
  type,
  label,
  ...props
}: ButtonProps) {
  const showLeftThrobber = loading && throbberPosition === "left";
  const showMiddleThrobber = loading && throbberPosition === "middle";
  const showRightThrobber = loading && throbberPosition === "right";

  return (
    <button
      type={type ?? "button"}
      className={classNames(
        "cvl-button",
        `cvl-button-${variant}`,
        {
          "cvl-button-full": width === "full",
          "cvl-button-loading": loading,
        },
        className
      )}
      {...props}
    >
      {showMiddleThrobber && (
        <div className="cvl-button-throbber-wrapper">
          <div className="cvl-button-throbber" />
        </div>
      )}
      <div
        className={classNames(
          "cvl-button-content",
          showMiddleThrobber && "cvl-button-content-hidden"
        )}
      >
        {showLeftThrobber && <div className="cvl-button-throbber" />}
        {leftIcon && renderIcon(leftIcon)}
        {label && <span className="cvl-button-label">{label?.trim()}</span>}
        {rightIcon && renderIcon(rightIcon)}
        {showRightThrobber && <div className="cvl-button-throbber" />}
      </div>
    </button>
  );
}
