import { classNames } from "@functions/classNames";
import { HiCheckCircle, HiExclamationCircle, HiExclamationTriangle, HiInformationCircle } from "react-icons/hi2";
import "./styles.css";

interface AlertProps {
  visible: boolean;
  type: "info" | "success" | "warning" | "error";
  message: string;
}

export function Alert({ type, message, visible }: AlertProps) {
  return (
    <div className={classNames("alert__container", type, !visible && "hidden")}>
      <span className="alert__icon">
        {type === "success" && <HiCheckCircle />}
        {type === "error" && <HiExclamationCircle />}
        {type === "info" && <HiInformationCircle />}
        {type === "warning" && <HiExclamationTriangle />}
      </span>
      <span className="alert__message">{message}</span>
    </div>
  );
}
