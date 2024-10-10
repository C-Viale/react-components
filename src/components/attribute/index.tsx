import { CopyToClipboard } from "@components/copy_to_clipboard";
import { classNames } from "@functions/classNames";
import { JSX, ReactNode } from "react";
import "./styles.css";

type AttributeProps = {
  name: string;
  layout?: "vertical" | "horizontal";
  fallback?: ReactNode;
  className?: string;
} & (
  | {
      value: JSX.Element;
      copyToClipboard?: never;
    }
  | {
      value?: string | number | null;
      copyToClipboard?: boolean;
    }
);
export function Attribute({
  name,
  value,
  layout = "horizontal",
  fallback,
  copyToClipboard,
  className,
}: AttributeProps) {
  return (
    <div
      className={classNames(
        "attribute__container",
        layout === "horizontal"
          ? "attribute__horizontal"
          : "attribute__vertical",
        className
      )}
    >
      <span className="attribute__name">{name}</span>
      <span className="attribute__value">
        {["string", "number"].includes(typeof value) && copyToClipboard ? (
          <CopyToClipboard value={String(value ?? "")} />
        ) : (
          value ?? fallback
        )}
      </span>
    </div>
  );
}
