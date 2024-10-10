import { CSSProperties, ReactNode } from "react";
import { classNames } from "@functions/classNames";
import "./styles.css";

interface CardProps {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function Card({ children, className, style }: CardProps) {
  return (
    <div className={classNames("card__container", className)} style={style}>
      {children}
    </div>
  );
}
