import { classNames } from "@functions/classNames";
import { useForwardedRef } from "@hooks/useForwardedRef";
import { ComponentPropsWithRef, useEffect } from "react";
import "./styles.css";

interface CheckboxProps extends ComponentPropsWithRef<"input"> {
  label?: string;
  indeterminate?: boolean;
  compact?: boolean;
}

export default function Checkbox({ id, ref, indeterminate, className, compact, ...props }: CheckboxProps) {
  const innerRef = useForwardedRef(ref);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = !!indeterminate;
  }, [innerRef, indeterminate]);

  return (
    <div className={classNames("cvl-checkbox-container", compact && "cvl-checkbox-compact")}>
      <input id={id} ref={innerRef} type="checkbox" className={classNames("cvl-checkbox", className)} {...props} />
      {props.label && (
        <label htmlFor={id} className="cvl-checkbox-label">
          {props.label}
        </label>
      )}
    </div>
  );
}
