import { useForwardedRef } from "@hooks/useForwardedRef";
import type { ForwardedRef, ReactNode } from "react";
import React, { forwardRef } from "react";

interface FormProps {
  children?: ReactNode;
  onSubmit?(values: Record<string, unknown>): void;
  onInvalid?(values: Record<string, boolean>): void;
  id?: string;
  name?: string;
  className?: string;
  noValidate?: boolean;
}

export const Form = forwardRef(
  ({ children, onSubmit, onInvalid, noValidate, ...props }: FormProps, ref: ForwardedRef<HTMLFormElement>) => {
    const innerRef = useForwardedRef(ref);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!event.currentTarget.checkValidity()) {
        const fields = innerRef.current?.querySelectorAll(":invalid:not(fieldset)") ?? [];

        const errors: Record<string, boolean> = {};

        for (const field of fields) {
          const name = field.getAttribute("name");
          if (name) errors[name] = true;
        }

        onInvalid?.(errors);
        if (!noValidate) event.currentTarget.reportValidity();
        return;
      }

      // This could be using just a FormData instance but FormData ignores unchecked checkboxes.
      // This is a manual validation so checkboxes return false instead of undefined
      // It also handles fieldsets elements, so every field inside a fieldset will be aggregated

      const result: Record<string, unknown> = {};

      Array.from(event.currentTarget.elements).forEach((element) => {
        const inputElement = element as HTMLInputElement;

        if (!inputElement.name) return;
        if (inputElement.tagName === "FIELDSET") return;

        let value: unknown;

        switch (inputElement.type) {
          case "checkbox":
            value = inputElement.checked;
            break;
          case "radio":
            if (inputElement.checked) {
              value = inputElement.value;
            }
            break;
          default:
            value = inputElement.value;
        }

        const fieldset = inputElement.closest("fieldset");
        const fieldsetName = fieldset?.getAttribute("name");

        if (fieldsetName) {
          const arrayRegex = /\[\d*\]$/;
          const isArray = arrayRegex.test(fieldsetName);

          const nameToUse = fieldsetName.replace(arrayRegex, "");

          let fieldsetValue = result[nameToUse] as any;

          if (!fieldsetValue) {
            fieldsetValue = isArray ? [] : {};
          }

          if (isArray) {
            const index = (fieldsetName.match(arrayRegex)?.[0] || "").replaceAll(/(\[|\])/g, "");

            fieldsetValue[index] = {
              ...(fieldsetValue[index] ?? {}),
              [inputElement.name]: value,
            };
          } else {
            fieldsetValue[inputElement.name] = value;
          }

          result[nameToUse] = fieldsetValue;
        } else {
          result[inputElement.name] = value;
        }
      });

      onSubmit?.(result);
    };

    return (
      <form onSubmit={handleSubmit} ref={innerRef} noValidate {...props}>
        {children}
      </form>
    );
  },
);

interface FieldsetProps extends React.ComponentPropsWithoutRef<"fieldset"> {
  index?: number;
}

export function FieldSet({ children, name, index, ...props }: FieldsetProps) {
  let formName = name;

  if (index != null && name) {
    formName = `${name}[${index}]`;
  }

  return (
    <fieldset name={formName} {...props}>
      {children}
    </fieldset>
  );
}
