import { ReactNode } from "react";
import "./styles.css";

interface InfoBlockProps {
  name: string;
  value?: string | number | null;
  fallback?: ReactNode;
}

export function InfoBlock({ name, value, fallback }: InfoBlockProps) {
  return (
    <div className="info-block__container">
      <span className="info-block__name">{name}</span>
      <span className="info-block__value">{value ?? fallback}</span>
    </div>
  );
}
