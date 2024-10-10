import type { ButtonVariant, ButtonWidth } from "./types";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-info-600 text-neutral-white hover:bg-info-800 disabled:bg-neutral-200",
  secondary: "bg-gray-100 text-info-600 hover:bg-gray-200 disabled:bg-neutral-200",
  tertiary:
    "bg-neutral-white text-neutral-500 ring-1 hover:text-info-600 hover:ring-2 ring-neutral-200 disabled:bg-neutral-200",
  danger: "bg-neutral-white text-neutral-500 ring-1 ring-neutral-200 hover:text-error-500",
};

export const buttonLoadingVariants: Record<ButtonVariant, string> = {
  primary: "!bg-info-800",
  secondary: "!bg-gray-200",
  tertiary: "!text-info-600",
  danger: "!text-error-500",
};
export const throbberColors: Record<ButtonVariant, string> = {
  primary: "border-neutral-white",
  secondary: "border-info-600",
  tertiary: "border-info-500",
  danger: "text-error-500",
};

export const buttonSizes: Record<ButtonWidth, string> = {
  fit: "w-fit",
  full: "flex-2 w-full",
};
