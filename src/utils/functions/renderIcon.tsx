import { ReactNode } from "react";

type IconType = React.ComponentType<{ className?: string }>;

export function renderIcon(icon: IconType | ReactNode, className?: string) {
  if (typeof icon === "function") {
    const IconComponent = icon as IconType;
    return <IconComponent className={className} />;
  }

  return <span className={className}>{icon}</span>;
}
