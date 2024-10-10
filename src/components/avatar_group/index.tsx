import { Avatar } from "../avatar";
import type { AvatarProps } from "../avatar";
import Tooltip from "../tooltip";

interface AvatarGroupProps extends Omit<AvatarProps, "name" | "image"> {
  items: { name: string; image?: string }[];
  max?: number;
}

export function AvatarGroup({
  items,
  showTooltip,
  size,
  max = 3,
}: AvatarGroupProps) {
  const maxOverloadLength = 10;
  const overload = items.slice(max);
  const overloadList = overload
    .slice(0, maxOverloadLength)
    .map((item) => <div key={item.name}>{item.name}</div>);

  const difference = overload.length - overloadList.length;

  if (difference > 0) {
    overloadList.push(<div key="others">+{difference} usuários...</div>);
  }

  return (
    <div className="avatar-group__container">
      {items.map((item, index) => {
        if (index < max) {
          return (
            <Avatar
              key={item.name}
              name={item.name}
              showTooltip={showTooltip}
              size={size}
            />
          );
        }

        if (items.length - 1 === index) {
          return (
            <Tooltip key="overload" details={overloadList} position="bottom">
              <Avatar name="+" size={size} />
            </Tooltip>
          );
        }

        return null;
      })}
    </div>
  );
}
