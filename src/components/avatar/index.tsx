import Tooltip from "@components/tooltip";
import { classNames } from "@functions/classNames";
import { getNameInitials } from "@functions/text";
import { HiUser } from "react-icons/hi2";
import "./styles.css";

export interface AvatarProps {
  name: string;
  image?: string;
  size?: "small" | "medium" | "large";
  showTooltip?: boolean;
  fallback?: "icon" | "initials";
  error?: boolean;
}

export function Avatar({ name, image, fallback, showTooltip, error, size = "medium" }: AvatarProps) {
  return (
    <div className={classNames("avatar__container", size)}>
      <Tooltip position="top" title={name} hidden={!showTooltip}>
        <div className={classNames("avatar__content", error && "avatar__error")}>
          {image ? (
            <img className="avatar__image" src={image} alt="Avatar" />
          ) : (
            <>{fallback === "icon" ? <HiUser /> : getNameInitials(name)}</>
          )}
        </div>
      </Tooltip>
    </div>
  );
}
