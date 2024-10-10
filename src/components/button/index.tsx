import { classNames } from "@functions/classNames";
import { capitalize } from "@functions/text";
import React, { ReactNode } from "react";
import { buttonLoadingVariants, buttonSizes, buttonVariants } from "./config";
import Throbber from "./throbber";
import type { ButtonVariant, ButtonWidth, IconType, ThrobberPosition } from "./types";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  rightIcon?: IconType | ReactNode;
  leftIcon?: IconType | ReactNode;
  loading?: boolean;
  throbberPosition?: ThrobberPosition;
  variant?: ButtonVariant;
  width?: ButtonWidth;
  label?: string;
  children?: never;
  shortcut?: string;
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
  shortcut,
  ...props
}: ButtonProps) {
  const renderIcon = (icon?: IconType | ReactNode) => {
    if (!icon) return null;

    if (typeof icon === "function") {
      const IconComponent = icon as IconType;
      return <IconComponent className="w-5" />;
    }

    return icon;
  };

  const showLeftThrobber = loading && throbberPosition === "left";
  const showMiddleThrobber = loading && throbberPosition === "middle";
  const showRightThrobber = loading && throbberPosition === "right";

  return (
    <button
      className={classNames(
        "h-fit rounded-lg self-end relative",
        "disabled:bg-neutral-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:outline-none disabled:ring-0",
        "active:outline-info-600 active:outline",
        "h-10 px-4 py-2",
        "transition whitespace-nowrap",
        buttonSizes[width],
        buttonVariants[variant],
        loading && buttonLoadingVariants[variant],
        loading && "pointer-events-none",
        className,
      )}
      type={type ?? "button"}
      {...props}
    >
      {showMiddleThrobber && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Throbber variant={variant} />
        </div>
      )}
      <div
        className={classNames("flex justify-center items-center gap-2 whitespace-nowrap", {
          "opacity-0": showMiddleThrobber,
        })}
      >
        {showLeftThrobber && <Throbber variant={variant} />}
        {renderIcon(leftIcon)}
        {label && <span className="text-ellipsis overflow-hidden ">{capitalize(label.trim(), false)}</span>}
        {shortcut && <span>[ {shortcut} ]</span>}
        {renderIcon(rightIcon)}
        {showRightThrobber && <Throbber variant={variant} />}
      </div>
    </button>
  );
}
