import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

type A = {
  handler: () => void;
  disabled: boolean;
};

interface PickerHeaderProps {
  left?: A;
  right?: A;
  middle?(): void;
  text: string;
}

export function PickerHeader({ left, right, middle, text }: PickerHeaderProps) {
  return (
    <header className="picker__header">
      <button onClick={left?.handler} disabled={left?.disabled} className="picker__header__icon">
        <PiCaretLeft size={18} />
      </button>
      <span className="picker__header__text" onClick={middle}>
        {text}
      </span>
      <button onClick={right?.handler} disabled={right?.disabled} className="picker__header__icon">
        <PiCaretRight size={18} />
      </button>
    </header>
  );
}
