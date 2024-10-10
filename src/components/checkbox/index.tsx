import { classNames } from "@functions/classNames";
import { useForwardedRef } from "@hooks/useForwardedRef";
import { forwardRef, useEffect } from "react";
import "./styles.css";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ id, indeterminate, className, ...props }, ref) => {
  const innerRef = useForwardedRef(ref);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = !!indeterminate;
  }, [innerRef, indeterminate]);

  return (
    <div className="checkbox__wrapper">
      <input id={id} ref={innerRef} type="checkbox" className={classNames("checkbox__input", className)} {...props} />
      {props.label && <label htmlFor={id}>{props.label}</label>}
    </div>
  );
});

export default Checkbox;
