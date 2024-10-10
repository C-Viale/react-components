import { classNames } from "@functions/classNames";
import { throbberColors } from "./config";
import type { ButtonVariant } from "./types";

interface ThrobberProps {
  variant: ButtonVariant;
}

export default function Throbber({ variant }: ThrobberProps) {
  return (
    <div
      className={classNames(
        "w-4 h-4 min-w-[1rem] rounded-full bg-transparent",
        "border-2 border-t-transparent border-l-transparent",
        "animate-spin",
        throbberColors[variant],
      )}
    />
  );
}
