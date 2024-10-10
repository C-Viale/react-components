import { classNames } from "@functions/classNames";
import { useForwardedRef } from "@hooks/useForwardedRef";
import { forwardRef } from "react";
import "./styles.css";

interface RadioProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ id, className, ...props }, ref) => {
  const innerRef = useForwardedRef(ref);

  return (
    <div className="radio__wrapper">
      <input id={id} ref={innerRef} type="radio" className={classNames("radio__input", className)} {...props} />
      {props.label && (
        <label className="radio__label" htmlFor={id}>
          {props.label}
        </label>
      )}
    </div>
  );
});
