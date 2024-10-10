import Tooltip from "@components/tooltip";
import { ReactNode } from "react";
import { PiCopy } from "react-icons/pi";
import "./styles.css";

interface CopyToClipboardProps {
  value: string;
  text?: ReactNode;
  hint?: string;
}

export function CopyToClipboard({ value, text, hint }: CopyToClipboardProps) {
  const copy = () => {
    void navigator.clipboard.writeText(value);
  };

  return (
    <span className="copy-to-clipboard__container">
      {text ?? value}
      <Tooltip title={hint ?? "Clique para copiar"} position="right">
        <PiCopy size={22} color="#878787" onClick={copy} />
      </Tooltip>
    </span>
  );
}
