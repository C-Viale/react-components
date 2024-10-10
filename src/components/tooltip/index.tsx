import { classNames } from "@functions/classNames";
import { ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./styles.css";

type TooltipPosition = "top" | "left" | "right" | "bottom";

interface TooltipProps {
  children: ReactNode;
  title?: string;
  details?: ReactNode;
  position: TooltipPosition;
  hidden?: boolean;
}

export default function Tooltip({ children, title, details, position = "top", hidden }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const toggleTooltip = (nextValue: boolean) => {
    return () => {
      setVisible(nextValue);
      calculatePosition();
    };
  };

  const calculatePosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top, left;

      switch (position) {
        case "top":
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;

          // Adjust if the tooltip overflows the viewport
          if (top < 0) top = triggerRect.bottom + 8; // Flip to bottom
          if (left < 0) left = 0; // Adjust to left edge
          if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width; // Adjust to right edge
          break;

        case "right":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;

          // Adjust if the tooltip overflows the viewport
          if (left + tooltipRect.width > viewportWidth) left = triggerRect.left - tooltipRect.width - 8; // Flip to left
          if (top < 0) top = 0; // Adjust to top edge
          if (top + tooltipRect.height > viewportHeight) top = viewportHeight - tooltipRect.height; // Adjust to bottom edge
          break;

        case "bottom":
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;

          // Adjust if the tooltip overflows the viewport
          if (top + tooltipRect.height > viewportHeight) top = triggerRect.top - tooltipRect.height - 8; // Flip to top
          if (left < 0) left = 0; // Adjust to left edge
          if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width; // Adjust to right edge
          break;

        case "left":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;

          // Adjust if the tooltip overflows the viewport
          if (left < 0) left = triggerRect.right + 8; // Flip to right
          if (top < 0) top = 0; // Adjust to top edge
          if (top + tooltipRect.height > viewportHeight) top = viewportHeight - tooltipRect.height; // Adjust to bottom edge
          break;

        default:
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
      }

      setTooltipStyle({
        top: `${top}px`,
        left: `${left}px`,
      });
    }
  };

  const container = document.getElementById("popover_portal");

  if (!container || hidden) {
    if (visible) setVisible(false);
    return children;
  }

  return (
    <>
      <div
        ref={triggerRef}
        className="tooltip__content"
        onMouseEnter={toggleTooltip(true)}
        onMouseLeave={toggleTooltip(false)}
      >
        {children}
      </div>
      {createPortal(
        <div
          ref={tooltipRef}
          className={classNames("tooltip__container", position)}
          style={{ ...tooltipStyle, opacity: visible ? 1 : 0 }}
        >
          {title && <h4 className="tooltip__title">{title}</h4>}
          {title && details && <hr className="tooltip__divider" />}
          {details && <div className="tooltip__details">{details}</div>}
        </div>,
        container,
      )}
    </>
  );
}
